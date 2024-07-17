import { useGLTF } from "@react-three/drei"
import { invalidate } from "@react-three/fiber"
import * as THREE from "three"
import React from "react"
import { useSpring } from "@react-spring/three"
import type { RobotProps } from "./AnyRobot"
import model from "./models/FANUC_CRX25iA.glb"

export function FANUC_CRX25iA({ axisConfig, ...props }: RobotProps) {
  const gltf = useGLTF(model) as any

  const nodes = gltf.nodes
  const materials = gltf.materials

  function setRotation() {
    axis_1.current.rotation.y = axis_1_value.get()
    axis_2.current.rotation.y = axis_2_value.get() + Math.PI / 2
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
      <group name="Scene" position={[0, -0.37, 0]}>
        <group name="CRX25iA_L00">
          <mesh
            name="J1BASE_NetGen_Coarse"
            castShadow
            receiveShadow
            geometry={nodes.J1BASE_NetGen_Coarse.geometry}
            material={materials.Fanuc_BlackMetal}
          />
          <mesh
            name="J1BASE_NetGen_Coarse_1"
            castShadow
            receiveShadow
            geometry={nodes.J1BASE_NetGen_Coarse_1.geometry}
            material={materials.Fanuc_GreenPlastic}
          />
        </group>
        <group name="CRX25iA_J00" ref={axis_1}>
          <group
            name="CRX25iA_J01"
            position={[0, 0.37, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            ref={axis_2}
          >
            <group name="CRX25iA_J02" position={[0.95, 0, 0]} ref={axis_3}>
              <group
                name="CRX25iA_J03"
                rotation={[-Math.PI / 2, 0, 0]}
                ref={axis_4}
              >
                <group
                  name="CRX25iA_J04"
                  position={[0, -0.75, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                  ref={axis_5}
                >
                  <group
                    name="CRX25iA_J05"
                    position={[0, 0.185, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    ref={axis_6}
                  >
                    <group
                      name="CRX25iA_FLG"
                      position={[0, -0.18, 0]}
                      rotation={[-Math.PI, 0, 0]}
                    />
                    <mesh
                      name="CRX25iA_L06"
                      castShadow
                      receiveShadow
                      geometry={nodes.CRX25iA_L06.geometry}
                      material={materials.Fanuc_BlackMetal}
                      position={[0, -0.18, 0]}
                    />
                  </group>
                  <group name="CRX25iA_L05" position={[0, 0.185, 0]}>
                    <mesh
                      name="J6CASING_NetGen_Coarse"
                      castShadow
                      receiveShadow
                      geometry={nodes.J6CASING_NetGen_Coarse.geometry}
                      material={materials.Fanuc_WhitePlastic}
                    />
                    <mesh
                      name="J6CASING_NetGen_Coarse_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.J6CASING_NetGen_Coarse_1.geometry}
                      material={materials.Fanuc_GreenPlastic}
                    />
                  </group>
                </group>
                <group name="CRX25iA_L04" position={[0, -0.75, 0]}>
                  <mesh
                    name="J3ARM_NetGen_Coarse"
                    castShadow
                    receiveShadow
                    geometry={nodes.J3ARM_NetGen_Coarse.geometry}
                    material={materials.Fanuc_WhitePlastic}
                  />
                  <mesh
                    name="J3ARM_NetGen_Coarse_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.J3ARM_NetGen_Coarse_1.geometry}
                    material={materials.Fanuc_RedPlastic}
                  />
                  <mesh
                    name="J3ARM_NetGen_Coarse_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.J3ARM_NetGen_Coarse_2.geometry}
                    material={materials.Fanuc_BlackPlastic}
                  />
                </group>
              </group>
              <group name="CRX25iA_L03">
                <mesh
                  name="J3CASING_NetGen_Coarse"
                  castShadow
                  receiveShadow
                  geometry={nodes.J3CASING_NetGen_Coarse.geometry}
                  material={materials.Fanuc_WhitePlastic}
                />
                <mesh
                  name="J3CASING_NetGen_Coarse_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.J3CASING_NetGen_Coarse_1.geometry}
                  material={materials.Fanuc_GreenPlastic}
                />
              </group>
            </group>
            <mesh
              name="CRX25iA_L02"
              castShadow
              receiveShadow
              geometry={nodes.CRX25iA_L02.geometry}
              material={materials.Fanuc_WhitePlastic}
            />
          </group>
          <group name="CRX25iA_L01" position={[0, 0.18, 0]}>
            <mesh
              name="J2BASE_NetGen_Coarse"
              castShadow
              receiveShadow
              geometry={nodes.J2BASE_NetGen_Coarse.geometry}
              material={materials.Fanuc_WhitePlastic}
            />
            <mesh
              name="J2BASE_NetGen_Coarse_1"
              castShadow
              receiveShadow
              geometry={nodes.J2BASE_NetGen_Coarse_1.geometry}
              material={materials.Fanuc_GreenLED}
            />
          </group>
        </group>
      </group>
    </group>
  )
}
