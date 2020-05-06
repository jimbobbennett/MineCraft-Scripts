function agent_destroy_forward () {
    while (agent.detect(AgentDetection.Block, FORWARD)) {
        agent.destroy(FORWARD)
        loops.pause(500)
    }
    agent.collectAll()
}
function destroy_tunnel_section () {
    agent_destroy_up()
    agent.destroy(DOWN)
    agent_destroy_left()
    agent_destroy_right()
    agent.collectAll()
    agent.move(UP, 1)
    agent_destroy_up()
    agent_destroy_left()
    agent_destroy_right()
    agent.collectAll()
    agent.move(UP, 1)
    agent_destroy_left()
    agent_destroy_right()
    agent.collectAll()
    agent.move(DOWN, 3)
    agent_destroy_left()
    agent_destroy_right()
    agent.destroy(DOWN)
    agent.collectAll()
    agent.move(DOWN, 1)
    agent_destroy_left()
    agent_destroy_right()
    agent.collectAll()
    agent.move(RIGHT, 1)
    for (let index = 0; index < 4; index++) {
        agent_destroy_right()
        agent.collectAll()
        agent.move(UP, 1)
    }
    agent_destroy_right()
    agent.collectAll()
    agent.move(LEFT, 2)
    for (let index = 0; index < 4; index++) {
        agent_destroy_left()
        agent.collectAll()
        agent.move(DOWN, 1)
    }
    agent_destroy_left()
    agent.collectAll()
    agent.move(UP, 2)
    agent.move(RIGHT, 1)
}
function agent_destroy_left () {
    while (agent.detect(AgentDetection.Block, LEFT)) {
        agent.destroy(LEFT)
        loops.pause(500)
    }
    agent.collectAll()
}
function agent_destroy_up () {
    while (agent.detect(AgentDetection.Block, UP)) {
        agent.destroy(UP)
        loops.pause(500)
    }
    agent.collectAll()
}
function look_for_blocks_udlr () {
    if (agent.detect(AgentDetection.Block, UP)) {
        need_tunnel = 1
    }
    if (agent.detect(AgentDetection.Block, DOWN)) {
        need_tunnel = 1
    }
    if (agent.detect(AgentDetection.Block, LEFT)) {
        need_tunnel = 1
    }
    if (agent.detect(AgentDetection.Block, RIGHT)) {
        need_tunnel = 1
    }
}
player.onChat("summon-agent", function (d) {
    set_agent_direction(d)
    agent.move(FORWARD, 1)
})
function set_agent_direction (direction: number) {
    if (direction == 1) {
        agent.teleport(pos(0, 0, 0), NORTH)
    }
    if (direction == 2) {
        agent.teleport(pos(0, 0, 0), EAST)
    }
    if (direction == 3) {
        agent.teleport(pos(0, 0, 0), SOUTH)
    }
    if (direction == 4) {
        agent.teleport(pos(0, 0, 0), WEST)
    }
}
player.onChat("build-railway", function () {
    position_count = 10
    need_tunnel = 1
    while (1 == need_tunnel) {
        if (agent.detect(AgentDetection.Block, FORWARD)) {
            agent_destroy_forward()
            agent.move(FORWARD, 1)
        } else {
            agent.move(FORWARD, 1)
        }
        look_for_blocks()
        if (1 == need_tunnel) {
            destroy_tunnel_section()
            build_walls()
        }
    }
})
function look_for_blocks () {
    need_tunnel = 0
    look_for_blocks_udlr()
    if (0 == need_tunnel) {
        agent.move(UP, 1)
        look_for_blocks_udlr()
        agent.move(DOWN, 2)
        look_for_blocks_udlr()
        agent.move(UP, 1)
        agent.move(LEFT, 1)
        look_for_blocks_udlr()
        agent.move(RIGHT, 2)
        look_for_blocks_udlr()
        agent.move(LEFT, 1)
    }
    if (0 == need_tunnel) {
        agent.move(UP, 1)
        agent.move(RIGHT, 1)
        look_for_blocks_udlr()
        agent.move(DOWN, 2)
        look_for_blocks_udlr()
        agent.move(LEFT, 2)
        look_for_blocks_udlr()
        agent.move(UP, 2)
        look_for_blocks_udlr()
        agent.move(RIGHT, 1)
        agent.move(DOWN, 1)
    }
    if (0 == need_tunnel) {
        agent.move(LEFT, 2)
        agent.move(UP, 1)
        if (agent.detect(AgentDetection.Block, UP)) {
            need_tunnel = 1
        }
        agent.move(DOWN, 2)
        if (agent.detect(AgentDetection.Block, DOWN)) {
            need_tunnel = 1
        }
        agent.move(RIGHT, 4)
        if (agent.detect(AgentDetection.Block, DOWN)) {
            need_tunnel = 1
        }
        agent.move(UP, 2)
        if (agent.detect(AgentDetection.Block, UP)) {
            need_tunnel = 1
        }
        agent.move(LEFT, 2)
        agent.move(DOWN, 1)
    }
}
function build_walls () {
    agent.setItem(WHITE_CONCRETE, 9, 1)
    agent.setItem(SEA_LANTERN, 1, 2)
    agent.setItem(POWERED_RAIL, 1, 3)
    agent.setItem(LEVER, 1, 4)
    agent.move(DOWN, 1)
    agent.move(LEFT, 2)
    agent.setSlot(1)
    for (let index = 0; index < 4; index++) {
        agent.place(DOWN)
        agent.move(RIGHT, 1)
    }
    agent.place(DOWN)
    agent.move(LEFT, 1)
    for (let index = 0; index < 3; index++) {
        agent.place(RIGHT)
        agent.move(UP, 1)
    }
    agent.place(RIGHT)
    agent.move(LEFT, 1)
    agent.place(RIGHT)
    agent.move(LEFT, 1)
    for (let index = 0; index < 3; index++) {
        agent.place(LEFT)
        agent.move(DOWN, 1)
    }
    agent.place(LEFT)
    agent.move(UP, 2)
    agent.place(UP)
    agent.move(RIGHT, 1)
    agent.move(DOWN, 2)
    agent.setSlot(3)
    agent.place(DOWN)
    if (10 <= position_count) {
        agent.setSlot(4)
        agent.move(RIGHT, 1)
        agent.place(DOWN)
        agent.setSlot(2)
        agent.move(LEFT, 1)
        agent.move(UP, 2)
        agent.place(UP)
        agent.move(DOWN, 1)
        position_count = 0
    } else {
        if (5 == position_count) {
            agent.setSlot(2)
        } else {
            agent.setSlot(1)
        }
        agent.move(UP, 2)
        agent.place(UP)
        agent.move(DOWN, 1)
        position_count += 1
    }
}
function agent_destroy_right () {
    while (agent.detect(AgentDetection.Block, RIGHT)) {
        agent.destroy(RIGHT)
        loops.pause(500)
    }
    agent.collectAll()
}
let need_tunnel = 0
let position_count = 0
position_count = 10
need_tunnel = 1
