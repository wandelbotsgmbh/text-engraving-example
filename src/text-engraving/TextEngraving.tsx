"use client"

import { CircularProgress, IconButton, TextField } from "@mui/material"
import "@fontsource/inter"
import "@fontsource/inter/100.css" // Specify weight

import Fingerprint from "@mui/icons-material/Fingerprint"
import ReplayIcon from "@mui/icons-material/Replay"
import { useEffect, useState } from "react"
import script from "./04_Writing_companies.ws"
import {
  useActiveRobot,
  useProgramRunner,
  useWandelApp,
} from "@/WandelAppContext"
import { autorun } from "mobx"
import { ProgramState } from "@wandelbots/wandelbots-js"

export default function TextEngraving() {
  const wandelApp = useWandelApp()
  const activeRobot = useActiveRobot()
  const programRunner = useProgramRunner()

  const [isLoading, setIsLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [firstname, setFirstname] = useState("")
  const [company, setCompany] = useState("")
  const [errorFirstname, setErrorFirstname] = useState(false)
  const [errorCompany, setErrorCompany] = useState(false)

  useEffect(() => {
    const disposer = autorun(() => {
      if (
        isLoading &&
        programRunner.currentProgram.state === ProgramState.Completed
      ) {
        increaseCellIndex()
        setIsLoading(false)
        setIsFinished(true)
      }
    })

    return () => disposer()
  }, [programRunner, isLoading, programRunner.currentProgram.state])

  const sendRequest = async (firstname: string, company: string) => {
    const value =
      await wandelApp.nova.api.programValues.getProgramValue("cell_index")
    let cell_index = parseInt(value as any)
    console.log("current cell_index: " + cell_index)

    const plate_offset_value =
      await wandelApp.nova.api.programValues.getProgramValue("plate_offset")
    let plate_offset = parseInt(plate_offset_value as any)
    console.log("current plate_offset: " + plate_offset)

    programRunner.executeProgram(
      script,
      {
        my_name: firstname,
        my_company: company,
        cell_index: cell_index,
        plate_offset: plate_offset,
      },
      activeRobot,
    )
  }

  async function increaseCellIndex() {
    const cell_index_value =
      await wandelApp.nova.api.programValues.getProgramValue("cell_index")
    let cell_index = parseInt(cell_index_value as any)
    cell_index = cell_index + 1

    await wandelApp.nova.api.programValues.createProgramsValue({
      cell_index: cell_index,
    })

    console.log("new cell_index: " + cell_index)
  }

  const makeHistory = () => {
    setErrorFirstname(false)
    setErrorCompany(false)

    if (firstname.length > 0 && company.length > 0) {
      setIsLoading(true)
      sendRequest(firstname, company)
    } else {
      if (firstname.length == 0) setErrorFirstname(true)
      if (company.length == 0) setErrorCompany(true)
    }
  }

  const reset = () => {
    setFirstname("")
    setCompany("")
    setIsFinished(false)
    programRunner.reset()
  }

  return (
    <div className="h-[calc(100dvh)] flex flex-col">
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(255,14,101,1) 0%, rgba(87,12,245,1) 20%, rgba(20,5,52,1) 100%)",
        }}
        className="h-[9px]"
      ></div>
      <div
        style={{ background: "#121826" }}
        className="flex flex-col items-center"
      >
        <img
          src="text-engraving/img/wb-nova-logo.png"
          className="h-[32px] my-[16px]"
        ></img>
      </div>
      <div
        className="flex-1 flex flex-col"
        style={{
          background:
            "linear-gradient(180deg, rgba(82,24,149,1) 0%, rgba(17,22,35,1) 39%)",
        }}
      >
        {!isLoading ? (
          !isFinished ? (
            <div className="flex-1 flex flex-col">
              <div className="">
                <img
                  src="text-engraving/img/astronaut.png"
                  className="m-auto w-[128px] mt-[48px]"
                ></img>
              </div>
              <div className="mt-[12px] flex items-center">
                <span
                  style={{ fontFamily: "Inter", fontSize: "2.3rem" }}
                  className="w-full text-center text-white font-semibold"
                >
                  Join our launch crew!
                </span>
              </div>
              <div className="w-full mt-[48px] px-[32px]">
                <TextField
                  error={errorFirstname}
                  value={firstname}
                  onChange={(v) => {
                    setFirstname(v.target.value)
                  }}
                  placeholder="Your Name"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#5d616a",
                        borderWidth: "2px",
                        borderRadius: "16px",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        fontStyle: "italic",
                        fontWeight: "400",
                        fontSize: "0.75em",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#821EFF",
                      },
                      color: "#fff",
                      fontSize: "1.5em",
                      padding: "0.1em 0.25em 0.1em 0.25em",
                    },
                  }}
                  variant="outlined"
                  className="w-full"
                ></TextField>
                <TextField
                  error={errorCompany}
                  value={company}
                  onChange={(v) => setCompany(v.target.value)}
                  variant="outlined"
                  className="w-full mt-[16px]"
                  placeholder="Your Company"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#5d616a",
                        borderWidth: "2px",
                        borderRadius: "16px",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        fontStyle: "italic",
                        fontWeight: "400",
                        fontSize: "0.75em",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                        borderRadius: "8px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#821EFF",
                        borderRadius: "8px",
                      },
                      color: "#fff",
                      fontSize: "1.5em",
                      padding: "0.1em 0.25em 0.1em 0.25em",
                    },
                  }}
                ></TextField>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <IconButton
                  onClick={makeHistory}
                  TouchRippleProps={{ classes: { child: "test" } }}
                  className="m-auto p-[16px]"
                  style={{ background: "#37167D" }}
                  sx={(theme) => ({
                    "& .MuiTouchRipple-child": {
                      backgroundColor: "rgba(255,255,255,0.8) !important",
                    },
                  })}
                >
                  <Fingerprint style={{ color: "white", fontSize: "5rem" }} />
                </IconButton>
              </div>
            </div>
          ) : (
            <div className="bg-stars flex-1 flex flex-col px-[32px]">
              <div className="m-auto text-center">
                <div>
                  <img
                    src="text-engraving/img/star.png"
                    className="w-[32px] absolute top-[100px] left-[100px]"
                  ></img>
                  <img
                    src="text-engraving/img/star.png"
                    className="w-[64px] absolute top-[150px] left-[250px]"
                  ></img>
                  <img
                    src="text-engraving/img/star.png"
                    className="w-[24px] absolute top-[90px] left-[450px]"
                  ></img>
                  <img
                    src="text-engraving/img/star.png"
                    className="w-[48px] absolute top-[600px] left-[120px]"
                  ></img>
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: "Inter",
                      fontSize: "2.3rem",
                      lineHeight: "2.5rem",
                    }}
                    className="w-full text-center text-white font-semibold"
                  >
                    {" "}
                    Welcome <br /> to the launch crew!
                  </span>
                </div>
                <div className="mt-[24px]">
                  <span
                    style={{
                      fontFamily: "Inter",
                      fontSize: "1.5rem",
                      fontWeight: "100",
                    }}
                    className="w-full text-center text-white"
                  >
                    {" "}
                    Get your footprint and add it <br />
                    to the wall of explorers.
                  </span>
                </div>
                <div>
                  <IconButton
                    onClick={reset}
                    TouchRippleProps={{ classes: { child: "test" } }}
                    className="m-auto p-[24px] mt-[64px]"
                    style={{ background: "#37167D" }}
                    sx={(theme) => ({
                      "& .MuiTouchRipple-child": {
                        backgroundColor: "rgba(255,255,255,0.8) !important",
                      },
                    })}
                  >
                    <ReplayIcon style={{ color: "white", fontSize: "4rem" }} />
                  </IconButton>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="flex-1 flex flex-col px-[32px]">
            <div className="m-auto text-center">
              <span
                style={{ fontFamily: "Inter", fontSize: "2.3rem" }}
                className="w-full text-center text-white font-semibold"
              >
                {" "}
                We add your name to the list of history
              </span>
              <div>
                <CircularProgress
                  style={{ width: "128px", height: "128px", color: "#970DBE" }}
                  className="mt-[64px]"
                  color="primary"
                  variant="indeterminate"
                ></CircularProgress>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
