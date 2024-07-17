import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { invalidate } from "@react-three/fiber"
import { useSpring } from "@react-spring/three"
import * as THREE from "three"
import type { RobotProps } from "./AnyRobot"
import model from "./models/KUKA_KR270_R2700.glb"

export function KUKA_KR270_R2700({ axisConfig, ...props }: RobotProps) {
  const gltf = useGLTF(model) as any

  const nodes = gltf.nodes
  const materials = gltf.materials

  function setRotation() {
    axis_1.current.rotation.y = axis_1_value.get()
    axis_2.current.rotation.y = axis_2_value.get()
    axis_3.current.rotation.y = axis_3_value.get() - Math.PI / 2
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
        <group name="kuka_kr270_2700_ultra">
          <group name="joint_01" ref={axis_1}>
            <group
              name="joint_02"
              position={[0.35, 0.675, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              ref={axis_2}
            >
              <group
                name="joint_03"
                position={[1.15, 0, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                ref={axis_3}
              >
                <group
                  name="joint_04"
                  position={[-0.041, 0, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                  ref={axis_4}
                >
                  <group
                    name="joint_05"
                    position={[0, -1.2, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    ref={axis_5}
                  >
                    <group name="joint_06" rotation={[Math.PI / 2, 0, 0]}>
                      <group
                        name="flange"
                        position={[0, -0.24, 0]}
                        rotation={[-Math.PI, 0, 0]}
                      />
                      <group
                        name="link_6"
                        position={[0, -0.213, 0]}
                        rotation={[0, 0, -Math.PI / 2]}
                        ref={axis_6}
                      >
                        <group name="visuals006">
                          <mesh
                            name="visuals006_1"
                            castShadow
                            receiveShadow
                            geometry={nodes.visuals006_1.geometry}
                            material={materials.material_Material_Farbe__1_}
                          />
                          <mesh
                            name="visuals006_2"
                            castShadow
                            receiveShadow
                            geometry={nodes.visuals006_2.geometry}
                            material={materials.material_Material_Metall}
                          />
                        </group>
                      </group>
                    </group>
                    <group
                      name="link_5"
                      position={[0, 0.044, 0]}
                      rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                    >
                      <mesh
                        name="visuals005"
                        castShadow
                        receiveShadow
                        geometry={nodes.visuals005.geometry}
                        material={materials.material_Material_Farbe}
                      />
                    </group>
                  </group>
                  <group
                    name="link_4"
                    position={[0, -0.954, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                  >
                    <mesh
                      name="visuals004"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals004.geometry}
                      material={materials.material_Material_Farbe}
                    />
                  </group>
                </group>
                <group
                  name="link_3"
                  position={[0, -0.178, 0]}
                  rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                >
                  <group name="visuals003">
                    <mesh
                      name="visuals003_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_1.geometry}
                      material={materials.material_Material_Farbe__1_}
                    />
                    <mesh
                      name="visuals003_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_2.geometry}
                      material={materials.material_Material_Farbe__2_}
                    />
                    <mesh
                      name="visuals003_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_3.geometry}
                      material={materials.material_Material_Metall}
                    />
                    <mesh
                      name="visuals003_4"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_4.geometry}
                      material={materials.material_Material_Farbe}
                    />
                  </group>
                </group>
              </group>
              <group name="link_2" rotation={[Math.PI / 2, 0, 0]}>
                <group name="visuals002">
                  <mesh
                    name="visuals002_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals002_1.geometry}
                    material={materials.material_Material_Farbe}
                  />
                  <mesh
                    name="visuals002_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals002_2.geometry}
                    material={materials.material_Material_Farbe__1_}
                  />
                  <mesh
                    name="visuals002_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals002_3.geometry}
                    material={materials.material_Material_Metall}
                  />
                  <mesh
                    name="visuals002_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals002_4.geometry}
                    material={materials.material_Material_Farbe__2_}
                  />
                </group>
              </group>
            </group>
            <group name="link_1" position={[0, 0.226, 0]}>
              <group name="visuals001">
                <mesh
                  name="visuals001_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_1.geometry}
                  material={materials.material_Material_Metall}
                />
                <mesh
                  name="visuals001_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_2.geometry}
                  material={materials.material_Material_Farbe__1_}
                />
                <mesh
                  name="visuals001_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_3.geometry}
                  material={materials.material_Material_Farbe__2_}
                />
                <mesh
                  name="visuals001_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_4.geometry}
                  material={materials.material_Material_Farbe}
                />
              </group>
            </group>
          </group>
          <group name="link_0-base">
            <group name="joint_1" />
            <group name="visuals">
              <mesh
                name="visuals_1"
                castShadow
                receiveShadow
                geometry={nodes.visuals_1.geometry}
                material={materials.material_Material_Metall}
              />
              <mesh
                name="visuals_2"
                castShadow
                receiveShadow
                geometry={nodes.visuals_2.geometry}
                material={materials.material_Material_Farbe__1_}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

// useGLTF.preload(`${env.BASE_PATH}/models/robots/kuka-kr270_ultra.glb`)
