import { useSpring } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import { invalidate } from "@react-three/fiber"
import React from "react"
import * as THREE from "three"
import type { RobotProps } from "./AnyRobot"
import model from "./models/UniversalRobots_UR5e.glb"

export function UniversalRobots_UR5e({ axisConfig, ...props }: RobotProps) {
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
        <group name="UR5e" rotation={[Math.PI / 2, 0, 0]}>
          <group name="UR5e_J01" rotation={[-Math.PI / 2, 0, 0]} ref={axis_1}>
            <group
              name="UR5e_J02"
              position={[0, 0.162, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              ref={axis_2}
            >
              <group name="UR5e_J03" position={[-0.425, 0, 0]} ref={axis_3}>
                <group name="UR5e_J04" position={[-0.392, 0, 0]} ref={axis_4}>
                  <group
                    name="UR5e_J05"
                    position={[0, 0.133, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    ref={axis_5}
                  >
                    <group
                      name="UR5e_J06"
                      position={[0, 0.1, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      ref={axis_6}
                    >
                      <group name="UR5e_FLG" position={[0, 0.1, 0]}></group>

                      <group
                        name="UR5e_L06"
                        position={[0, 0.1, 0]}
                        rotation={[0, 0, -Math.PI]}
                      >
                        <>
                          <mesh
                            name="C-1000255"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000255"].geometry}
                            material={materials.Black}
                          />
                          <mesh
                            name="C-1000255_1"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000255_1"].geometry}
                            material={materials.Metal}
                          />
                        </>
                      </group>
                    </group>
                    <group
                      name="UR5e_L05"
                      rotation={[-Math.PI / 2, -Math.PI / 3, 0]}
                    >
                      <>
                        <mesh
                          name="C-1000253"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000253"].geometry}
                          material={materials.Blue}
                        />
                        <mesh
                          name="C-1000253_1"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000253_1"].geometry}
                          material={materials.Black}
                        />
                        <mesh
                          name="C-1000253_2"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000253_2"].geometry}
                          material={materials.Metal}
                        />
                        <mesh
                          name="C-1000253_3"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000253_3"].geometry}
                          material={materials.DarkGray}
                        />
                      </>
                    </group>
                  </group>
                  <group name="UR5e_L04" rotation={[0, -Math.PI / 3, 0]}>
                    <>
                      <mesh
                        name="C-1000251"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000251"].geometry}
                        material={materials.Blue}
                      />
                      <mesh
                        name="C-1000251_1"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000251_1"].geometry}
                        material={materials.Black}
                      />
                      <mesh
                        name="C-1000251_2"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000251_2"].geometry}
                        material={materials.Metal}
                      />
                      <mesh
                        name="C-1000251_3"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000251_3"].geometry}
                        material={materials.DarkGray}
                      />
                    </>
                  </group>
                </group>
                <group name="UR5e_L03">
                  <>
                    <mesh
                      name="C-1000250"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000250"].geometry}
                      material={materials.Black}
                    />
                    <mesh
                      name="C-1000250_1"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000250_1"].geometry}
                      material={materials.DarkGray}
                    />
                    <mesh
                      name="C-1000250_2"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000250_2"].geometry}
                      material={materials.Blue}
                    />
                    <mesh
                      name="C-1000250_3"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000250_3"].geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="C-1000250_4"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000250_4"].geometry}
                      material={materials.Metal}
                    />
                  </>
                </group>
              </group>
              <group name="UR5e_L02" rotation={[0, -Math.PI / 2, 0]}>
                <>
                  <mesh
                    name="C-1000249"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000249"].geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="C-1000249_1"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000249_1"].geometry}
                    material={materials.Black}
                  />
                  <mesh
                    name="C-1000249_2"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000249_2"].geometry}
                    material={materials.DarkGray}
                  />
                  <mesh
                    name="C-1000249_3"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000249_3"].geometry}
                    material={materials.Blue}
                  />
                  <mesh
                    name="C-1000249_4"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000249_4"].geometry}
                    material={materials.Metal}
                  />
                </>
              </group>
            </group>
            <group name="UR5e_L01" rotation={[Math.PI / 2, 0, 0]}>
              <>
                <mesh
                  name="C-1000248"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000248"].geometry}
                  material={materials.DarkGray}
                />
                <mesh
                  name="C-1000248_1"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000248_1"].geometry}
                  material={materials.Black}
                />
                <mesh
                  name="C-1000248_2"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000248_2"].geometry}
                  material={materials.Blue}
                />
                <mesh
                  name="C-1000248_3"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000248_3"].geometry}
                  material={materials.Metal}
                />
              </>
            </group>
          </group>
          <group name="UR5e_L00">
            <>
              <mesh
                name="C-1000257"
                castShadow
                receiveShadow
                geometry={nodes["C-1000257"].geometry}
                material={materials.Black}
              />
              <mesh
                name="C-1000257_1"
                castShadow
                receiveShadow
                geometry={nodes["C-1000257_1"].geometry}
                material={materials.Metal}
              />
            </>
          </group>
        </group>
      </group>
    </group>
  )
}
