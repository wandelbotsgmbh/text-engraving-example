import { useSpring } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import { invalidate } from "@react-three/fiber"
import React from "react"
import * as THREE from "three"
import type { RobotProps } from "./AnyRobot"
import model from "./models/KUKA_KR210_R2700.glb"

export function KUKA_KR210_R2700({ axisConfig, ...props }: RobotProps) {
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
        <group name="kuka_kr210_2700">
          <group name="joint_01" ref={axis_1}>
            <group
              name="joint_02"
              position={[0.33, 0.645, 0]}
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
                  position={[0.115, 0, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                  ref={axis_4}
                >
                  <group
                    name="joint_05"
                    position={[0, -1.22, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    ref={axis_5}
                  >
                    <group name="joint_06" rotation={[Math.PI / 2, 0, 0]}>
                      <group
                        name="flange"
                        position={[0, -0.215, 0]}
                        rotation={[-Math.PI, 0, 0]}
                      />
                      <group
                        name="link_6"
                        position={[0, -0.17, 0]}
                        rotation={[0, 0, -Math.PI / 2]}
                        ref={axis_6}
                      >
                        <mesh
                          name="visuals006"
                          castShadow
                          receiveShadow
                          geometry={nodes.visuals006.geometry}
                          material={materials.material_Material_Metall_black}
                        />
                      </group>
                    </group>
                    <group
                      name="link_5"
                      position={[0, 0.059, 0]}
                      rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                    >
                      <group name="visuals005">
                        <mesh
                          name="visuals005_1"
                          castShadow
                          receiveShadow
                          geometry={nodes.visuals005_1.geometry}
                          material={materials.material_Material_metal_black}
                        />
                        <mesh
                          name="visuals005_2"
                          castShadow
                          receiveShadow
                          geometry={nodes.visuals005_2.geometry}
                          material={materials.material_Material_kuka_orange}
                        />
                      </group>
                    </group>
                  </group>
                  <group
                    name="link_4"
                    position={[0, -0.869, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                  >
                    <group name="visuals004">
                      <mesh
                        name="visuals004_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.visuals004_1.geometry}
                        material={materials.material_Material_metal_black}
                      />
                      <mesh
                        name="visuals004_2"
                        castShadow
                        receiveShadow
                        geometry={nodes.visuals004_2.geometry}
                        material={materials.material_Material_kuka_orange}
                      />
                    </group>
                  </group>
                </group>
                <group
                  name="link_3"
                  position={[0, -0.105, 0]}
                  rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                >
                  <group name="visuals003">
                    <mesh
                      name="visuals003_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_1.geometry}
                      material={materials.material_Material_rubber}
                    />
                    <mesh
                      name="visuals003_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_2.geometry}
                      material={materials.material_Material_aluminium}
                    />
                    <mesh
                      name="visuals003_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_3.geometry}
                      material={materials.material_Material_metal_black}
                    />
                    <mesh
                      name="visuals003_4"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_4.geometry}
                      material={materials.material_Material_kuka_black}
                    />
                    <mesh
                      name="visuals003_5"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_5.geometry}
                      material={materials.material_Material_Rubber_black}
                    />
                    <mesh
                      name="visuals003_6"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_6.geometry}
                      material={materials.material_Material_kuka_orange}
                    />
                    <mesh
                      name="visuals003_7"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_7.geometry}
                      material={materials.material_Material_stainless_steel}
                    />
                  </group>
                </group>
              </group>
              <group
                name="link_2"
                position={[0, 0.009, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <group name="visuals002">
                  <mesh
                    name="visuals002_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals002_1.geometry}
                    material={materials.material_Material_metal_black}
                  />
                  <mesh
                    name="visuals002_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals002_2.geometry}
                    material={materials.material_Material_Rubber_black}
                  />
                  <mesh
                    name="visuals002_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals002_3.geometry}
                    material={materials.material_Material_kuka_orange}
                  />
                </group>
              </group>
            </group>
            <group name="link_1" position={[0, 0.236, 0]}>
              <group name="visuals001">
                <mesh
                  name="visuals001_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_1.geometry}
                  material={materials.material_Material_kuka_black}
                />
                <mesh
                  name="visuals001_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_2.geometry}
                  material={materials.material_Material_kuka_orange}
                />
                <mesh
                  name="visuals001_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_3.geometry}
                  material={materials.material_Material_rubber}
                />
                <mesh
                  name="visuals001_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_4.geometry}
                  material={materials.material_Material_metal_black}
                />
                <mesh
                  name="visuals001_5"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_5.geometry}
                  material={materials.material_Material_aluminium}
                />
                <mesh
                  name="visuals001_6"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_6.geometry}
                  material={materials.material_Material_rubber_black}
                />
                <mesh
                  name="visuals001_7"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_7.geometry}
                  material={materials.material_Material_stainless_steel}
                />
              </group>
            </group>
          </group>
          <group name="link_0">
            <group name="visuals">
              <mesh
                name="visuals_1"
                castShadow
                receiveShadow
                geometry={nodes.visuals_1.geometry}
                material={materials.material_Material_kuka_black}
              />
              <mesh
                name="visuals_2"
                castShadow
                receiveShadow
                geometry={nodes.visuals_2.geometry}
                material={materials.material_Material_metal_black}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}
