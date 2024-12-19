import React, { useEffect, useRef, useState } from "react"
import Matter, {
  Body,
  Composite,
  Constraint,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  Svg,
  Vector,
} from "matter-js"
import { gsap } from "gsap"
import peepoSprite from "/peepoReal.png"
const STATIC_DENSITY = 15

// const musicNote = Svg.pathToVertices(318)
declare global {
  interface Window {
    engine: Engine
    runner: Runner
  }
}

export const PeepoSings = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Engine | undefined>(Engine.create(undefined, { gravity: { y: 0 } }))
  const [constraints, setContraints] = useState<DOMRect>()
  const [scene, setScene] = useState<Render>()

  const handleResize = () => {
    setContraints(boxRef.current?.getBoundingClientRect())
  }

  useEffect(() => {
    if (!boxRef.current || !canvasRef.current) return
    if (!engineRef.current) engineRef.current = Engine.create(undefined, { gravity: { y: 0 } })
    let Render = Matter.Render
    let World = Matter.World
    let Bodies = Matter.Bodies

    let engine = engineRef.current
    let mouse = Mouse.create(document.body)

    let cw = window.innerWidth
    let ch = window.innerHeight

    let mouseCon = MouseConstraint.create(engine, {
      mouse,
      collisionFilter: {
        category: 0x0001,
        mask: 0x0001,
      },
      constraint: {
        stiffness: 0.2,
        render: {
          visible: import.meta.env.DEV,
        },
      } as any,
    })

    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: { showPositions: true, background: "transparent", wireframes: false, showMousePosition: true },
    })
    render.mouse = mouse

    var offset = 10,
      options = {
        collisionFilter: {
          group: 1,
          category: 0x0010,
          mask: 0x0011,
        },
        isStatic: true,
        render: {
          visible: true,
        },
      }
    const walls = [
      Bodies.rectangle(cw / 2, -offset, cw + 2 * offset, 50.5, options),
      Bodies.rectangle(cw / 2, ch + offset, cw + 2 * offset, 50.5, options),
      Bodies.rectangle(cw + offset, ch / 2, 50.5, ch + 0.5 + 2 * offset, options),
      Bodies.rectangle(-offset, ch / 2, 50.5, ch + 0.5 + 2 * offset, options),
    ]

    const peepo = Body.create({
      position: { x: 150, y: ch + cw * 0.1 * 0.21 },

      vertices: [
        { x: 59, y: 53 },
        { x: 223, y: 29 },
        { x: 215, y: 250 },
        { x: 150, y: 350 },
        { x: 50, y: 350 },
        { x: 9, y: 250 },
      ],
      restitution: 0.9,
      render: {
        sprite: {
          texture: peepoSprite,
        } as any,
      },
      label: "Peepo",

      collisionFilter: {
        category: 0x0001,
        mask: 0x0001,
      },
      isStatic: true,
    })

    // const emitter = Bodies.fromVertices(peepo.position.x, peepo.position.y, [musicNote])
    Events.on(mouseCon, "startdrag", (e: MouseEventMatter) => {
      if (e.body.label === "Peepo") {
        Body.setStatic(e.body, false)
      }
    })
    Events.on(mouseCon, "enddrag", (e: MouseEventMatter) => {
      if (e.body.label === "Peepo") {
        Body.set(e.body, "collisionFilter", { group: 1, category: 0x0001, mask: 0x0011 })
      }
    })

    window.engine = engine

    engine.world.bodies = []
    const wallRoot = Composite.create()
    Composite.add(wallRoot, walls)

    World.add(engine.world, [wallRoot, peepo, mouseCon])
    window.runner = Runner.create()
    Runner.run(window.runner, engine)
    Render.run(render)

    setContraints(boxRef.current.getBoundingClientRect())
    setScene(render)
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: cw, y: ch },
    })

    // const onClick = (e: MouseEvent) => {
    //   e.preventDefault()
    // }
    // document.addEventListener("click", onClick)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      // document.removeEventListener("click", onClick)
      engineRef.current = undefined
      setScene(undefined)
    }
  }, [boxRef, canvasRef])

  useEffect(() => {
    if (!scene || !engineRef.current) return
    if (constraints) {
      let { width: cw, height: ch } = constraints

      // Dynamically update canvas and bounds
      scene.bounds.max.x = cw
      scene.bounds.max.y = ch
      scene.options.width = cw
      scene.options.height = ch
      scene.canvas.width = cw
      scene.canvas.height = ch

      // Dynamically update floor
      const bounds = engineRef.current.world.composites[0].bodies

      bounds.forEach((bdy, i) => {
        var offset = 10
        var x = cw / 2,
          y = -offset,
          w = cw + 2 * offset,
          h = 50.5
        switch (i) {
          case 1: // bottom
            y = ch + offset
            break
          case 2: // right
            x = cw + offset
            y = ch / 2
            w = 50.5
            h = ch + 0.5 + 2 * offset
            break
          case 3: // left
            x = -offset
            y = ch / 2
            w = 50.5
            h = ch + 0.5 + 2 * offset
            break
        }
        Matter.Body.setPosition(bdy, {
          x,
          y,
        })

        Matter.Body.setVertices(bdy, [
          { x: 0, y: 0 },
          { x: w, y: 0 },
          { x: w, y: h },
          { x: 0, y: h },
        ])
      })
      Render.lookAt(scene, {
        min: { x: 0, y: 0 },
        max: { x: cw, y: ch },
      })
    }
  }, [scene, constraints])

  return (
    <div
      ref={boxRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}>
      <canvas ref={canvasRef} />
    </div>
  )
}

interface MouseEventMatter {
  mouse: Mouse
  body: Body
  source: any
  name: string
}
