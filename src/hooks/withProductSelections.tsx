import { Vector3 } from "three";

import { Descriptor } from "../types";

export const withProductSelections = () => {
  const selections: Descriptor[][] = [
    [
      {
        id: "1234f5",
        materialSide: "front",
        name: "Door Base",
        position: new Vector3(0, -2, 0),
        type: "structure",
        url: require("../models/150-base.glb")
      },
      {
        id: "21c3d67a-s244-439d-abbb-5878bc6d3dc5",
        url: require("../textures/wood.png"),
        name: "Wood",
        type: "map",
        rotation: 0
      },
      {
        id: "11d3s67a-s244-439d-abbb-5878bc6d3dc5",
        value: "#29210f",
        name: "Mahogany",
        type: "color",
        roughness: 0.5
      }
      // {
      //   id: "11d3s67a-s244-439d-abbb-5878bc6d3dc5",
      //   value: "#690d08",
      //   name: "Firebrick Red",
      //   type: "color",
      //   roughness: 0.5
      // }
    ],
    [
      {
        id: "1234f5",
        name: "Exterior Handle",
        position: new Vector3(-0.15, -2, 0),
        type: "structure",
        url: require("../models/exteriorHandle.glb"),
        scale: 0.06
      },
      {
        id: "11d3s67a-s244-439d-abbb-5878bc6d3dc5",
        value: "#fce386",
        name: "Gold",
        type: "color",
        roughness: 0,
        clearcoat: 0.5,
        metalness: 1,
        reflectivity: 1
      }
    ],
    [
      {
        id: "124524f5",
        name: "Exterior Lock",
        position: new Vector3(-0.15, -2, 0),
        type: "structure",
        url: require("../models/exteriorLock.glb"),
        scale: 0.06
      },
      {
        id: "11d3s67a-s244-439d-abbb-587888bc6d3dc5",
        value: "#fce386",
        name: "Gold",
        type: "color",
        roughness: 0,
        clearcoat: 0.5,
        metalness: 1,
        reflectivity: 1
      }
    ],
    [
      {
        id: "23823",
        name: "Door Trim",
        position: new Vector3(0, -2, 0),
        type: "structure",
        url: require("../models/trimDoor.glb")
      },
      {
        id: "21c3d67a-s244-439d-abbb-5878bc6d3dc5",
        url: require("../textures/wood.png"),
        name: "Wood",
        type: "map",
        rotation: 0.5
      },
      {
        id: "11d3s67a-s244-439d-abbb-5878bc6d3dc5",
        value: "#fffef5",
        name: "White",
        type: "color",
        roughness: 0.2,
        clearcoat: 0.5
      }
    ],
    // [
    //   {
    //     id: "8283943",
    //     name: "Sidelite Inlay Left",
    //     position: new Vector3(-1.31, -2, 0.05),
    //     type: "structure",
    //     url: require("../models/160-inlay.glb")
    //   },
    //   {
    //     id: "21c3d67a-s244-439d-abbb-5878bc6d3dc5",
    //     url: require("../textures/wood.png"),
    //     name: "Wood",
    //     type: "map",
    //     rotation: 1.5
    //   },
    //   {
    //     id: "11d3s67a-s244-439d-abbb-5878bc6d3dc5",
    //     value: "#29210f",
    //     name: "Mahogany",
    //     type: "color",
    //     roughness: 0.5
    //   }
    // ],
    // [
    //   {
    //     id: "8343",
    //     name: "Sidelite Inlay Right",
    //     position: new Vector3(1.3, -2, 0.05),
    //     type: "structure",
    //     url: require("../models/160-inlay-right.glb")
    //   },
    //   {
    //     id: "21c3d67a-s244-439d-abbb-5878bc6d3dc5",
    //     url: require("../textures/wood.png"),
    //     name: "Wood",
    //     type: "map",
    //     rotation: -1.5
    //   },
    //   {
    //     id: "11d3s67a-s244-439d-abbb-5878bc6d3dc5",
    //     value: "#29210f",
    //     name: "Mahogany",
    //     type: "color",
    //     roughness: 0.5
    //   }
    // ],
    [
      {
        id: "8459993",
        name: "150 Glass Chips",
        position: new Vector3(0, -2, 0),
        type: "structure",
        url: require("../models/glassChips.glb"),
        nativeMaterials: true
      }
    ],
    [
      {
        id: "84599493",
        name: "150 Glass Gold",
        position: new Vector3(0, -2, 0),
        type: "structure",
        url: require("../models/glassGold.glb"),
        nativeMaterials: true
      }
    ],
    [
      {
        id: "84599493",
        name: "150 Glass Clear",
        position: new Vector3(0, -2, 0),
        type: "structure",
        url: require("../models/glassClear.glb"),
        nativeMaterials: true
      }
    ],
    [
      {
        id: "84599493",
        name: "150 Silver Bars",
        position: new Vector3(0, -2, 0),
        type: "structure",
        url: require("../models/silverBars.glb"),
        nativeMaterials: true
      }
    ]
    // [
    //   {
    //     id: "84599493",
    //     name: "150 Sidelite Silver Bars",
    //     position: new Vector3(-1.31, -2, 0.04),
    //     type: "structure",
    //     url: require("../models/sidelites/silverBar.glb"),
    //     nativeMaterials: true
    //   }
    // ],
    // [
    //   {
    //     id: "84599494",
    //     name: "150 Sidelite Silver Bars",
    //     position: new Vector3(1.3, -2, 0.04),
    //     type: "structure",
    //     url: require("../models/sidelites/silverBar-right.glb"),
    //     nativeMaterials: true
    //   }
    // ],
    // [
    //   {
    //     id: "84599495",
    //     name: "150 Sidelite Glass Clear",
    //     position: new Vector3(-1.31, -2, 0.04),
    //     type: "structure",
    //     url: require("../models/sidelites/glassClear.glb"),
    //     nativeMaterials: true
    //   }
    // ],
    // [
    //   {
    //     id: "84599496",
    //     name: "150 Sidelite Glass Clear",
    //     position: new Vector3(1.3, -2, 0.04),
    //     type: "structure",
    //     url: require("../models/sidelites/glassClear-right.glb"),
    //     nativeMaterials: true
    //   }
    // ],
    // [
    //   {
    //     id: "845994967",
    //     name: "150 Sidelite Glass RainV",
    //     position: new Vector3(-1.31, -2, 0.04),
    //     type: "structure",
    //     url: require("../models/sidelites/glassRainV.glb"),
    //     nativeMaterials: true
    //   }
    // ],
    // [
    //   {
    //     id: "845994968",
    //     name: "150 Sidelite Glass RainV",
    //     position: new Vector3(1.3, -2, 0.04),
    //     type: "structure",
    //     url: require("../models/sidelites/glassRainV-right.glb"),
    //     nativeMaterials: true
    //   }
    // ],
    // [
    //   {
    //     id: "845994968",
    //     name: "150 Sidelite Glass Chips",
    //     position: new Vector3(0, 0, 0.04),
    //     type: "structure",
    //     url: require("../models/sidelites/glassChips.glb"),
    //     nativeMaterials: true
    //   }
    // ]
  ];

  return [selections];
};
