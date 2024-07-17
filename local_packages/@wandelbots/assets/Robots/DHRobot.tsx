import React from "react"
import { Vector3, Matrix4, Quaternion } from "three"
import { useSprings } from "@react-spring/three"
import type { AxisConfig } from "./AxisConfig"
import { invalidate } from "@react-three/fiber"
import { Line, PivotControls } from "@react-three/drei"
import type { MotionGroupSpecification } from "@wandelbots/wandelbots-api-client"

interface DHRobotProps {
  motionGroupSpecification: MotionGroupSpecification
  axisConfig: AxisConfig
}

export function DHRobot({
  motionGroupSpecification,
  axisConfig,
}: DHRobotProps) {
  const accumulatedMatrix = new Matrix4()

  const axisValues = useSprings(
    axisConfig.length,
    axisConfig.map((axisValue) => ({
      value: axisValue,
      onChange: () => {
        invalidate()
      },
    })),
  )

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.01, 32, 32]} />
        <meshStandardMaterial color={"black"} depthTest={false} />
      </mesh>
      {motionGroupSpecification.dh_parameters!.map((param, index) => {
        const axisValue = axisValues[index]!.value.get()
        const position = new Vector3()
        const quaternion = new Quaternion()
        const scale = new Vector3()
        accumulatedMatrix.decompose(position, quaternion, scale)
        const prevPosition = position.clone() // Update the previous position

        const matrix = new Matrix4()
          .makeRotationY(param.theta! + axisValue) // Rotate around Z
          .multiply(new Matrix4().makeTranslation(0, param.d! / 1000, 0)) // Translate along Z
          .multiply(new Matrix4().makeTranslation(param.a! / 1000, 0, 0)) // Translate along X
          .multiply(new Matrix4().makeRotationX(param.alpha!)) // Rotate around X

        // Accumulate transformations
        accumulatedMatrix.multiply(matrix)
        accumulatedMatrix.decompose(position, quaternion, scale)

        return (
          <group key={"group_" + index}>
            <Line
              points={[prevPosition, position]}
              color="white"
              lineWidth={5}
              depthTest={false}
              key={"line_" + index}
            />
            <mesh
              key={"mesh_" + index}
              position={position}
              quaternion={quaternion}
              scale={scale}
            >
              <sphereGeometry args={[0.01, 32, 32]} />
              <meshStandardMaterial color={"black"} depthTest={false} />
              {index === motionGroupSpecification.dh_parameters!.length - 1 && (
                <group rotation={[Math.PI / 2, 0, 0]} scale={[1, -1, -1]}>
                  <PivotControls
                    depthTest={false}
                    fixed={false}
                    scale={0.1}
                    disableRotations={true}
                    disableSliders={true}
                    autoTransform={false}
                  ></PivotControls>
                </group>
              )}
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
