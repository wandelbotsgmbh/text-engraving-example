import { useSpring } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import { invalidate } from "@react-three/fiber"
import React from "react"
import * as THREE from "three"
import type { RobotProps } from "./AnyRobot"
import model from "./models/Yaskawa_AR1730.glb"

export function Yaskawa_AR1730({ axisConfig, ...props }: RobotProps) {
  const gltf = useGLTF(model) as any

  const nodes = gltf.nodes
  const materials = gltf.materials

  function setRotation() {
    axis_1.current.rotation.y = axis_1_value.get()
    axis_2.current.rotation.y = -axis_2_value.get() - Math.PI / 2
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
        <group name="AR1730_J00" ref={axis_1}>
          <group
            name="AR1730_J01"
            position={[0.15, 0, 0]}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            ref={axis_2}
          >
            <group
              name="AR1730_J02"
              position={[0.76, 0, 0]}
              rotation={[-Math.PI, 0, 0]}
              ref={axis_3}
            >
              <group
                name="AR1730_J03"
                position={[0.2, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                ref={axis_4}
              >
                <group
                  name="AR1730_J04"
                  position={[0, -0.795, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                  ref={axis_5}
                >
                  <group
                    name="AR1730_J05"
                    rotation={[-Math.PI / 2, 0, 0]}
                    ref={axis_6}
                  >
                    <group
                      name="AR1730_FLG"
                      position={[0, -0.1, 0]}
                      rotation={[-Math.PI, 0, 0]}
                    />
                    <mesh
                      name="AR1730_L06"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR1730_L06.geometry}
                      material={materials.Metal}
                      rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    name="AR1730_L05"
                    castShadow
                    receiveShadow
                    geometry={nodes.AR1730_L05.geometry}
                    material={materials.Blue}
                    rotation={[Math.PI / 2, 0, Math.PI / 2]}
                  />
                </group>
                <group
                  name="AR1730_L04"
                  position={[0, -0.302, 0]}
                  rotation={[0, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="_R_AXIS_SW0001002"
                    castShadow
                    receiveShadow
                    geometry={nodes._R_AXIS_SW0001002.geometry}
                    material={materials.Blue}
                  />
                  <mesh
                    name="_R_AXIS_SW0001002_1"
                    castShadow
                    receiveShadow
                    geometry={nodes._R_AXIS_SW0001002_1.geometry}
                    material={materials.White}
                  />
                </group>
              </group>
              <group
                name="AR1730_L03"
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
              >
                <mesh
                  name="_U_AXIS_SW0001002"
                  castShadow
                  receiveShadow
                  geometry={nodes._U_AXIS_SW0001002.geometry}
                  material={materials.Blue}
                />
                <mesh
                  name="_U_AXIS_SW0001002_1"
                  castShadow
                  receiveShadow
                  geometry={nodes._U_AXIS_SW0001002_1.geometry}
                  material={materials.Black}
                />
              </group>
            </group>
            <mesh
              name="AR1730_L02"
              castShadow
              receiveShadow
              geometry={nodes.AR1730_L02.geometry}
              material={materials.Blue}
              position={[0, -0.157, 0]}
              rotation={[-Math.PI, -1.571, 0]}
            />
          </group>
          <group
            name="AR1730_L01"
            position={[0, -0.336, 0]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="_S_AXIS_SW0001002"
              castShadow
              receiveShadow
              geometry={nodes._S_AXIS_SW0001002.geometry}
              material={materials.Blue}
            />
            <mesh
              name="_S_AXIS_SW0001002_1"
              castShadow
              receiveShadow
              geometry={nodes._S_AXIS_SW0001002_1.geometry}
              material={materials.Black}
            />
          </group>
        </group>
        <mesh
          name="AR1730_L00"
          castShadow
          receiveShadow
          geometry={nodes.AR1730_L00.geometry}
          material={materials.Blue}
          position={[0, -0.505, 0]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        />
      </group>
    </group>
  )
}
