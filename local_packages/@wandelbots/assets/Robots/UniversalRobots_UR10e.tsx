import { useSpring } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import { invalidate } from "@react-three/fiber"
import React from "react"
import * as THREE from "three"
import type { RobotProps } from "./AnyRobot"
import model from "./models/UniversalRobots_UR10e.glb"

export function UniversalRobots_UR10e({ axisConfig, ...props }: RobotProps) {
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
        <group name="UR10e" rotation={[Math.PI / 2, 0, 0]}>
          <group name="UR10e_J01" rotation={[-Math.PI / 2, 0, 0]} ref={axis_1}>
            <group
              name="UR10e_J02"
              position={[0, 0.181, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              ref={axis_2}
            >
              <group name="UR10e_J03" position={[-0.613, 0, 0]} ref={axis_3}>
                <group name="UR10e_J04" position={[-0.572, 0, 0]} ref={axis_4}>
                  <group
                    name="UR10e_J05"
                    position={[0, 0.174, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    ref={axis_5}
                  >
                    <group
                      name="UR10e_J06"
                      position={[0, 0.12, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      ref={axis_6}
                    >
                      <group
                        name="UR10e_FLG"
                        position={[1.184, -0.174, 0.061]}
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <mesh
                          name="C-1000493"
                          geometry={nodes["C-1000493"].geometry}
                          material={materials.Black}
                          castShadow
                          receiveShadow
                        />
                        <mesh
                          name="C-1000493_1"
                          geometry={nodes["C-1000493_1"].geometry}
                          material={materials.Metal}
                          castShadow
                          receiveShadow
                        />
                      </group>
                      <group name="UR10e_L07" position={[0, 0.117, 0]}></group>
                    </group>
                    <group
                      name="UR10e_L06"
                      position={[1.184, 0.181, 0.174]}
                      rotation={[Math.PI, 0, 0]}
                    >
                      <mesh
                        name="C-1000492"
                        geometry={nodes["C-1000492"].geometry}
                        material={materials.DarkGray}
                        castShadow
                        receiveShadow
                      />
                      <mesh
                        name="C-1000492_1"
                        geometry={nodes["C-1000492_1"].geometry}
                        material={materials.Black}
                        castShadow
                        receiveShadow
                      />
                      <mesh
                        name="C-1000492_2"
                        geometry={nodes["C-1000492_2"].geometry}
                        material={materials.Blue}
                        castShadow
                        receiveShadow
                      />
                      <mesh
                        name="C-1000492_3"
                        geometry={nodes["C-1000492_3"].geometry}
                        material={materials.Screw}
                        castShadow
                        receiveShadow
                      />
                    </group>
                  </group>
                  <group
                    name="UR10e_L05"
                    position={[1.184, 0, 0.181]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      name="C-1000491"
                      geometry={nodes["C-1000491"].geometry}
                      material={materials.DarkGray}
                      castShadow
                      receiveShadow
                    />
                    <mesh
                      name="C-1000491_1"
                      geometry={nodes["C-1000491_1"].geometry}
                      material={materials.Blue}
                      castShadow
                      receiveShadow
                    />
                    <mesh
                      name="C-1000491_2"
                      geometry={nodes["C-1000491_2"].geometry}
                      material={materials.Black}
                      castShadow
                      receiveShadow
                    />
                    <mesh
                      name="C-1000491_3"
                      geometry={nodes["C-1000491_3"].geometry}
                      material={materials.Screw}
                      castShadow
                      receiveShadow
                    />
                  </group>
                </group>
                <group
                  name="UR10e_L04"
                  position={[0.613, 0, 0.181]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <mesh
                    name="C-1000490"
                    geometry={nodes["C-1000490"].geometry}
                    material={materials.Metal}
                    castShadow
                    receiveShadow
                  />
                  <mesh
                    name="C-1000490_1"
                    geometry={nodes["C-1000490_1"].geometry}
                    material={materials.Black}
                    castShadow
                    receiveShadow
                  />
                  <mesh
                    name="C-1000490_2"
                    geometry={nodes["C-1000490_2"].geometry}
                    material={materials.DarkGray}
                    castShadow
                    receiveShadow
                  />
                  <mesh
                    name="C-1000490_3"
                    geometry={nodes["C-1000490_3"].geometry}
                    material={materials.Blue}
                    castShadow
                    receiveShadow
                  />
                </group>
              </group>
              <group
                name="UR10e_L03"
                position={[0, 0, 0.181]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="C-1000489"
                  geometry={nodes["C-1000489"].geometry}
                  material={materials.Blue}
                  castShadow
                  receiveShadow
                />
                <mesh
                  name="C-1000489_1"
                  geometry={nodes["C-1000489_1"].geometry}
                  material={materials.Black}
                  castShadow
                  receiveShadow
                />
                <mesh
                  name="C-1000489_2"
                  geometry={nodes["C-1000489_2"].geometry}
                  material={materials.DarkGray}
                  castShadow
                  receiveShadow
                />
                <mesh
                  name="C-1000489_3"
                  geometry={nodes["C-1000489_3"].geometry}
                  material={materials.Screw}
                  castShadow
                  receiveShadow
                />
                <mesh
                  name="C-1000489_4"
                  geometry={nodes["C-1000489_4"].geometry}
                  material={materials.Metal}
                  castShadow
                  receiveShadow
                />
              </group>
            </group>
            <group name="UR10e_L02">
              <mesh
                name="C-1000488"
                geometry={nodes["C-1000488"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
              />
              <mesh
                name="C-1000488_1"
                geometry={nodes["C-1000488_1"].geometry}
                material={materials.Blue}
                castShadow
                receiveShadow
              />
              <mesh
                name="C-1000488_2"
                geometry={nodes["C-1000488_2"].geometry}
                material={materials.Screw}
                castShadow
                receiveShadow
              />
              <mesh
                name="C-1000488_3"
                geometry={nodes["C-1000488_3"].geometry}
                material={materials.DarkGray}
                castShadow
                receiveShadow
              />
            </group>
          </group>
          <group name="UR10e_L01" rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              name="C-1000487"
              geometry={nodes["C-1000487"].geometry}
              material={materials.Black}
              castShadow
              receiveShadow
            />
            <mesh
              name="C-1000487_1"
              geometry={nodes["C-1000487_1"].geometry}
              material={materials.Metal}
              castShadow
              receiveShadow
            />
          </group>
        </group>
      </group>
    </group>
  )
}
