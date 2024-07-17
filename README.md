# WandelUI

An example of a minimal application for engraving character strings, e.g. names, with the help of Wandelscript. 

To use our platform, please sign up for our [Wandelbots Platform program](https://portal.wandelbots.io/).

Interface             |  Result
:-------------------------:|:-------------------------:
![text-engraving-example-1](https://github.com/user-attachments/assets/19331589-c7d0-4991-9131-a27bcfdc46eb)  |  ![text-engraving-example-2](https://github.com/user-attachments/assets/962cc36e-d768-4e79-af5b-f98bb2ee277d)


https://github.com/user-attachments/assets/cfb8cd3f-36c4-4814-80e5-1624b6bc24da

## Overview

### Set-up
Used Set-Up for the demo seen in the project: 
robot: Yaskawa AR 1440 industrial robot 
tool:  AMB milling motor 1400 FME-P 230V (for ER20 precision collets) 

robot        |  tool
:-------------------------:|:-------------------------:
![text-engraving-example-1](https://github.com/user-attachments/assets/19331589-c7d0-4991-9131-a27bcfdc46eb)  |  ![text-engraving-example-2](https://github.com/user-attachments/assets/962cc36e-d768-4e79-af5b-f98bb2ee277d)

To get the demo running, import the following robot settings `configuration.json` (which includes the robot model and TCP) into the settings App on the NOVA Home Screen. You can't directly use the configuration with a different setup but they serve as a guiding line.


TOOL 1: 
xyz 


## Usage

The Wandelscript located in `text-engraving`, writes the text which is passed as a variable. 

The scripts accepts 5 arguments:
- `cell_index`: the index of the cell in the grid (used in `writing_company`)
- `char_index`: the index of current letter (used in `writing_names`)
- `my_name`: the name to be engraved
- `my_company`: the company name
- `plate_offset`: the offset of the plate, allows to test the engraving in a safe distance

The variables are stored within the ETCD database. Make sure one exists in your cell environment.

If you use a different setup you might need to adjust the script accordingly.
- `canvas_in_robot`: The script writes the text on an canvas
- `home`: p2p home position
- `TOOL 1` the TCP.
- `moving_velocity` set to 500
- `tool_io` is "10010#0001" change it to the correct one if needed

## Run Application

### Install dependencies:
```bash
npm install
```

### Run app:
```bash
npm run dev
```
