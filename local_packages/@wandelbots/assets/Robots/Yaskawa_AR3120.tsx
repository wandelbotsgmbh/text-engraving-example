import { useSpring } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import { invalidate } from "@react-three/fiber"
import React from "react"
import * as THREE from "three"
import type { RobotProps } from "./AnyRobot"
import model from "./models/Yaskawa_AR3120.glb"

export function Yaskawa_AR3120({ axisConfig, ...props }: RobotProps) {
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
        <group name="AR3120_J00" ref={axis_1}>
          <group
            name="AR3120_J01"
            position={[0.145, 0, 0]}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            ref={axis_2}
          >
            <group
              name="AR3120_J02"
              position={[1.15, 0, 0]}
              rotation={[-Math.PI, 0, 0]}
              ref={axis_3}
            >
              <group
                name="AR3120_J03"
                position={[0.25, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                ref={axis_4}
              >
                <group
                  name="AR3120_J04"
                  position={[0, -1.812, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                  ref={axis_5}
                >
                  <group
                    name="AR3120_J05"
                    rotation={[-Math.PI / 2, 0, 0]}
                    ref={axis_6}
                  >
                    <group
                      name="AR3120_FLG"
                      position={[0, -0.1, 0]}
                      rotation={[-Math.PI, 0, 0]}
                    />
                    <mesh
                      name="AR3120_L06"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR3120_L06.geometry}
                      material={materials["Metal.001"]}
                      rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    name="AR3120_L05"
                    castShadow
                    receiveShadow
                    geometry={nodes.AR3120_L05.geometry}
                    material={materials["Blue.001"]}
                    rotation={[Math.PI / 2, 0, Math.PI / 2]}
                  />
                </group>
                <group
                  name="AR3120_L04"
                  rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                >
                  <mesh
                    name="R_AXIS_GP20HL001"
                    castShadow
                    receiveShadow
                    geometry={nodes.R_AXIS_GP20HL001.geometry}
                    material={materials["Blue.001"]}
                  />
                  <mesh
                    name="R_AXIS_GP20HL001_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.R_AXIS_GP20HL001_1.geometry}
                    material={materials["White.001"]}
                  />
                </group>
              </group>
              <group name="AR3120_L03" rotation={[Math.PI, 0, -Math.PI / 2]}>
                <mesh
                  name="Mesh_3001"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_3001.geometry}
                  material={materials["Blue.001"]}
                />
                <mesh
                  name="Mesh_3001_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_3001_1.geometry}
                  material={materials["Black.001"]}
                />
              </group>
            </group>
            <mesh
              name="AR3120_L02"
              castShadow
              receiveShadow
              geometry={nodes.AR3120_L02.geometry}
              material={materials["Blue.001"]}
              position={[0, -0.146, 0]}
              rotation={[Math.PI, 0, 0]}
            />
          </group>
          <group
            name="AR3120_L01"
            position={[0, -0.228, 0]}
            rotation={[0, -1.571, 0]}
          >
            <mesh
              name="S_AXIS_GP20HL001"
              castShadow
              receiveShadow
              geometry={nodes.S_AXIS_GP20HL001.geometry}
              material={materials["Blue.001"]}
            />
            <mesh
              name="S_AXIS_GP20HL001_1"
              castShadow
              receiveShadow
              geometry={nodes.S_AXIS_GP20HL001_1.geometry}
              material={materials["Black.001"]}
            />
          </group>
        </group>
        <mesh
          name="AR3120_L00"
          castShadow
          receiveShadow
          geometry={nodes.AR3120_L00.geometry}
          material={materials["Blue.001"]}
          position={[0, -0.54, 0]}
        />
      </group>
    </group>
  )
}
