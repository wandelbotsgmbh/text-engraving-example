import { useSpring } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import { invalidate } from "@react-three/fiber"
import * as THREE from "three"
import React from "react"
import type { RobotProps } from "./AnyRobot"
import model from "./models/FANUC_ARC_Mate_100iD.glb"

export function FANUC_ARC_Mate_100iD({ axisConfig, ...props }: RobotProps) {
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
      <group name="Scene">
        <group name="M10iD" rotation={[Math.PI / 2, 0, 0]}>
          <group name="M10iD_J01" rotation={[-Math.PI / 2, 0, 0]} ref={axis_1}>
            <group
              name="M10iD_J02"
              position={[0.075, 0, 0]}
              rotation={[Math.PI / 2, Math.PI / 2, 0]}
              ref={axis_2}
            >
              <group name="M10iD_J03" position={[0.64, 0, 0]} ref={axis_3}>
                <group
                  name="M10iD_J04"
                  position={[0.195, 0, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  ref={axis_4}
                >
                  <group
                    name="M10iD_J05"
                    position={[0, -0.7, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    ref={axis_5}
                  >
                    <group
                      name="M10iD_J06"
                      rotation={[-Math.PI / 2, 0, 0]}
                      ref={axis_6}
                    >
                      <group
                        name="M10iD_FLG"
                        position={[0, -0.075, 0]}
                        rotation={[-Math.PI, 0, 0]}
                      />
                      <mesh
                        name="M10iD_L06"
                        castShadow
                        receiveShadow
                        geometry={nodes.M10iD_L06.geometry}
                        material={materials.Fanuc_BlackMetal_AO}
                        position={[-0.835, 0.775, 0]}
                        rotation={[0, 0, -Math.PI / 2]}
                      />
                    </group>
                    <mesh
                      name="M10iD_L05"
                      castShadow
                      receiveShadow
                      geometry={nodes.M10iD_L05.geometry}
                      material={materials.Fanuc_BlackMetal_AO}
                      position={[-0.835, 0, -0.775]}
                      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                    />
                  </group>
                  <group
                    name="M10iD_L04"
                    position={[-0.835, 0.075, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                  >
                    <mesh
                      name="Mesh_654"
                      castShadow
                      receiveShadow
                      geometry={nodes.Mesh_654.geometry}
                      material={materials.Fanuc_Yellow_Textured_AO}
                    />
                    <mesh
                      name="Mesh_654_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.Mesh_654_1.geometry}
                      material={materials.Fanuc_BlackMetal_AO}
                    />
                  </group>
                </group>
                <group
                  name="M10iD_L03"
                  position={[-0.64, 0, -0.075]}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="Mesh_378"
                    castShadow
                    receiveShadow
                    geometry={nodes.Mesh_378.geometry}
                    material={materials.Material_1_AO}
                  />
                  <mesh
                    name="Mesh_378_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Mesh_378_1.geometry}
                    material={materials.Fanuc_Yellow_Textured_AO}
                  />
                  <mesh
                    name="Mesh_378_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Mesh_378_2.geometry}
                    material={materials.Fanuc_BlackMetal_AO}
                  />
                </group>
              </group>
              <group
                name="M10iD_L02"
                position={[0, 0, -0.075]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              >
                <mesh
                  name="Mesh_358"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_358.geometry}
                  material={materials.Fanuc_Yellow_Textured_AO}
                />
                <mesh
                  name="Mesh_358_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_358_1.geometry}
                  material={materials.Fanuc_BlackMetal_AO}
                />
              </group>
            </group>
            <group name="M10iD_L01">
              <mesh
                name="Mesh_356"
                castShadow
                receiveShadow
                geometry={nodes.Mesh_356.geometry}
                material={materials.Fanuc_Yellow_Textured_AO}
              />
              <mesh
                name="Mesh_356_1"
                castShadow
                receiveShadow
                geometry={nodes.Mesh_356_1.geometry}
                material={materials.Material_1_AO}
              />
              <mesh
                name="Mesh_356_2"
                castShadow
                receiveShadow
                geometry={nodes.Mesh_356_2.geometry}
                material={materials.Fanuc_BlackMetal_AO}
              />
            </group>
          </group>
          <mesh
            name="M10iD_L00"
            castShadow
            receiveShadow
            geometry={nodes.M10iD_L00.geometry}
            material={materials.Fanuc_BlackMetal_AO}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    </group>
  )
}
