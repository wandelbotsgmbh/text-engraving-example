import { useSpring } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import { invalidate } from "@react-three/fiber"
import React from "react"
import * as THREE from "three"
import type { RobotProps } from "./AnyRobot"
import model from "./models/UniversalRobots_UR3.glb"

export function UniversalRobots_UR3({ axisConfig, ...props }: RobotProps) {
  const gltf = useGLTF(model) as any

  const nodes = gltf.nodes
  const materials = gltf.materials

  function setRotation() {
    axis_1.current.rotation.y = axis_1_value.get()
    axis_2.current.rotation.y = axis_2_value.get()
    axis_3.current.rotation.y = axis_3_value.get()
    axis_4.current.rotation.y = axis_4_value.get()
    axis_5.current.rotation.y = axis_5_value.get()
    axis_6.current.rotation.y = axis_6_value.get()
  }

  const axis_1 = React.useRef<THREE.Group>(new THREE.Group())
  const axis_2 = React.useRef<THREE.Group>(new THREE.Group())
  const axis_3 = React.useRef<THREE.Group>(new THREE.Group())
  const axis_4 = React.useRef<THREE.Group>(new THREE.Group())
  const axis_5 = React.useRef<THREE.Group>(new THREE.Group())
  const axis_6 = React.useRef<THREE.Group>(new THREE.Group())

  const [
    {
      axis_1_value,
      axis_2_value,
      axis_3_value,
      axis_4_value,
      axis_5_value,
      axis_6_value,
    },
    setSpring,
  ] = useSpring(() => ({
    axis_1_value: axisConfig[0]!,
    axis_2_value: axisConfig[1]!,
    axis_3_value: axisConfig[2]!,
    axis_4_value: axisConfig[3]!,
    axis_5_value: axisConfig[4]!,
    axis_6_value: axisConfig[5]!,
    onChange: () => {
      setRotation()
      invalidate()
    },
    onResolve: () => {
      setRotation()
    },
  }))

  setSpring.start({
    axis_1_value: axisConfig[0]!,
    axis_2_value: axisConfig[1]!,
    axis_3_value: axisConfig[2]!,
    axis_4_value: axisConfig[3]!,
    axis_5_value: axisConfig[4]!,
    axis_6_value: axisConfig[5]!,
  })

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="UR3" rotation={[Math.PI / 2, 0, 0]}>
          <group name="UR3_J01" rotation={[-Math.PI / 2, 0, 0]} ref={axis_1}>
            <group
              name="UR3_J02"
              position={[0, 0.152, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              ref={axis_2}
            >
              <group name="UR3_J03" position={[-0.244, 0, 0]} ref={axis_3}>
                <group name="UR3_J04" position={[-0.213, 0, 0]} ref={axis_4}>
                  <group
                    name="UR3_J05"
                    position={[0, 0.112, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    ref={axis_5}
                  >
                    <mesh
                      name="UR3_05"
                      castShadow
                      receiveShadow
                      geometry={nodes.UR3_05.geometry}
                      material={materials.Standard}
                    />
                    <group
                      name="UR3_J06"
                      position={[0, 0.085, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      ref={axis_6}
                    >
                      <group name="UR3_FLG" position={[0, 0.082, 0]} />
                      <mesh
                        name="UR3_L06"
                        castShadow
                        receiveShadow
                        geometry={nodes.UR3_L06.geometry}
                        material={materials.Standard}
                      />
                    </group>
                  </group>
                  <mesh
                    name="UR3_L04"
                    castShadow
                    receiveShadow
                    geometry={nodes.UR3_L04.geometry}
                    material={materials.Standard}
                  />
                </group>
                <mesh
                  name="UR3_L03"
                  castShadow
                  receiveShadow
                  geometry={nodes.UR3_L03.geometry}
                  material={materials.Standard}
                />
              </group>
              <mesh
                name="UR3_L02"
                castShadow
                receiveShadow
                geometry={nodes.UR3_L02.geometry}
                material={materials.Standard}
              />
            </group>
            <mesh
              name="UR3_L01"
              castShadow
              receiveShadow
              geometry={nodes.UR3_L01.geometry}
              material={materials.Standard}
            />
          </group>
          <mesh
            name="UR3_L00"
            castShadow
            receiveShadow
            geometry={nodes.UR3_L00.geometry}
            material={materials.Standard}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    </group>
  )
}
