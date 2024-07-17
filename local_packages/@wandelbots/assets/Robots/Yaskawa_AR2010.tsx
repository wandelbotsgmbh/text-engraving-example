import { useSpring } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import { invalidate } from "@react-three/fiber"
import React from "react"
import * as THREE from "three"
import type { RobotProps } from "./AnyRobot"
import model from "./models/Yaskawa_AR2010.glb"

export function Yaskawa_AR2010({ axisConfig, ...props }: RobotProps) {
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
        <group name="AR2010" rotation={[Math.PI / 2, 0, 0]}>
          <group name="AR2010_J01" rotation={[-Math.PI / 2, 0, 0]} ref={axis_1}>
            <group
              name="AR2010_J02"
              position={[0.15, 0, 0]}
              rotation={[Math.PI / 2, 0, Math.PI]}
              ref={axis_2}
            >
              <group
                name="AR2010_J03"
                position={[0.76, 0, 0]}
                rotation={[Math.PI, 0, 0]}
                ref={axis_3}
              >
                <group
                  name="AR2010_J04"
                  position={[0.2, 0, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  ref={axis_4}
                >
                  <group
                    name="AR2010_J05"
                    position={[0, -1.082, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    ref={axis_5}
                  >
                    <group name="AR2010_J06" rotation={[-Math.PI / 2, 0, 0]}>
                      <group
                        name="AR2010_FLG"
                        position={[0, -0.1, 0]}
                        rotation={[-Math.PI, 0, 0]}
                        ref={axis_6}
                      ></group>
                      <group name="AR2010_L06">
                        <mesh
                          name="AR2010_06001"
                          castShadow
                          receiveShadow
                          geometry={nodes.AR2010_06001.geometry}
                          material={materials.yaskawaBlueMetall}
                        />
                        <mesh
                          name="AR2010_06001_1"
                          castShadow
                          receiveShadow
                          geometry={nodes.AR2010_06001_1.geometry}
                          material={materials.metall}
                        />
                      </group>
                    </group>
                    <mesh
                      name="AR2010_L05"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR2010_L05.geometry}
                      material={materials.yaskawaBlueMetall}
                    />
                  </group>
                  <group name="AR2010_L04">
                    <mesh
                      name="AR2010_04001"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR2010_04001.geometry}
                      material={materials.yaskawaBlueMetall}
                    />
                    <mesh
                      name="AR2010_04001_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR2010_04001_1.geometry}
                      material={materials.white}
                    />
                  </group>
                </group>
                <group name="AR2010_L03">
                  <mesh
                    name="AR2010_03001"
                    castShadow
                    receiveShadow
                    geometry={nodes.AR2010_03001.geometry}
                    material={materials.yaskawaBlueMetall}
                  />
                  <mesh
                    name="AR2010_03001_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.AR2010_03001_1.geometry}
                    material={materials.blackMetall}
                  />
                </group>
              </group>
              <mesh
                name="AR2010_L02"
                castShadow
                receiveShadow
                geometry={nodes.AR2010_L02.geometry}
                material={materials.yaskawaBlueMetall}
              />
            </group>
            <group name="AR2010_L01">
              <mesh
                name="AR2010_01001"
                castShadow
                receiveShadow
                geometry={nodes.AR2010_01001.geometry}
                material={materials.yaskawaBlueMetall}
              />
              <mesh
                name="AR2010_01001_1"
                castShadow
                receiveShadow
                geometry={nodes.AR2010_01001_1.geometry}
                material={materials.blackMetall}
              />
            </group>
          </group>
          <mesh
            name="AR2010_L00"
            castShadow
            receiveShadow
            geometry={nodes.AR2010_L00.geometry}
            material={materials.yaskawaBlueMetall}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    </group>
  )
}
