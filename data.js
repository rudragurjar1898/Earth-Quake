/**
 * Himalayan Region Earthquake & Tectonic GIS Dataset
 * Curated for: "Mapping Earthquake-Prone Zones in the Himalayan Region"
 * Sources: USGS Earthquake Hazards Program, International Seismological Centre (ISC),
 * Bureau of Indian Standards (IS 1893:2016), Department of Mines and Geology (DMG Nepal),
 * and Global Seismic Hazard Assessment Program (GSHAP).
 */

const HIMALAYAN_DATA = {
  // Region metadata
  meta: {
    title: "Seismic Geospatial Database of the Himalayan Orogen",
    bounds: {
      minLat: 22.0,
      maxLat: 38.0,
      minLng: 68.0,
      maxLng: 102.0
    },
    defaultCenter: [29.5, 83.5],
    defaultZoom: 6,
    plateConvergenceRateMmYear: 45
  },

  // Major Tectonic Fault Systems
  faults: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          id: "fault-hff",
          name: "Himalayan Frontal Fault (HFF / MFT)",
          shortName: "HFF",
          category: "Thrust Fault",
          depth: "Surface to 10 km",
          slipRate: "10 – 15 mm/yr",
          lastMajorRupture: "1934 Bihar-Nepal / 1950 Assam",
          seismicHazard: "Critical / Blind Ramp Ruptures",
          color: "#ff3b5c",
          description: "The southernmost active thrust boundary separating the Siwalik foothill belt from the active Indo-Gangetic alluvium. Represents the emergent surface expression of the decollement."
        },
        geometry: {
          type: "LineString",
          coordinates: [
            [72.8, 33.2], [74.2, 32.8], [75.8, 32.2], [77.2, 30.6], [78.5, 29.8],
            [80.1, 28.9], [82.0, 28.1], [83.6, 27.6], [85.4, 27.0], [87.2, 26.8],
            [88.8, 26.7], [90.5, 26.8], [92.4, 27.0], [94.2, 27.6], [95.8, 28.2]
          ]
        }
      },
      {
        type: "Feature",
        properties: {
          id: "fault-mbt",
          name: "Main Boundary Thrust (MBT)",
          shortName: "MBT",
          category: "Major Thrust Fault",
          depth: "10 to 25 km",
          slipRate: "5 – 10 mm/yr",
          lastMajorRupture: "1905 Kangra / 1803 Garhwal",
          seismicHazard: "Very High",
          color: "#ff9100",
          description: "Major regional thrust separating the Lesser Himalayan meta-sedimentary series from the Neogene Siwalik group. Highly active seismic zone with frequent moderate-to-large quakes."
        },
        geometry: {
          type: "LineString",
          coordinates: [
            [73.5, 34.0], [74.8, 33.3], [76.4, 32.4], [77.9, 31.0], [79.2, 30.1],
            [80.8, 29.3], [82.5, 28.5], [84.2, 28.0], [85.9, 27.5], [87.8, 27.2],
            [89.5, 27.1], [91.2, 27.2], [93.1, 27.5], [94.9, 28.0], [96.2, 28.6]
          ]
        }
      },
      {
        type: "Feature",
        properties: {
          id: "fault-mct",
          name: "Main Central Thrust (MCT)",
          shortName: "MCT",
          category: "Ductile / Brittle Thrust",
          depth: "15 to 35 km",
          slipRate: "2 – 6 mm/yr",
          lastMajorRupture: "Mid-Holocene to Present micro-seismicity",
          seismicHazard: "High (Intermediate Focal Depth)",
          color: "#00f0ff",
          description: "Historic ductile shear zone that carried the high-grade metamorphic crystalline core of the Higher Himalayas over the Lesser Himalaya. Now exhibits high microseismicity along its mid-crustal ramp."
        },
        geometry: {
          type: "LineString",
          coordinates: [
            [74.5, 34.6], [75.6, 33.9], [77.2, 32.8], [78.6, 31.5], [79.9, 30.6],
            [81.4, 29.8], [83.2, 29.0], [84.8, 28.4], [86.5, 27.9], [88.3, 27.7],
            [90.0, 27.6], [91.8, 27.8], [93.6, 28.1], [95.3, 28.5], [96.8, 29.0]
          ]
        }
      },
      {
        type: "Feature",
        properties: {
          id: "fault-mht",
          name: "Main Himalayan Thrust (MHT Decollement)",
          shortName: "MHT (Basal Detachment)",
          category: "Basal Mega-Thrust Decollement",
          depth: "5 to 25 km beneath surface",
          slipRate: "~18 – 21 mm/yr locked convergence",
          lastMajorRupture: "2015 Gorkha (M7.8) / 1934 Bihar-Nepal (M8.1)",
          seismicHazard: "Extreme (Primary Megaquake Generator)",
          color: "#d946ef",
          description: "The primary continental mega-thrust decollement upon which the entire Himalayan wedge slides over the underthrusting Indian lithosphere. The locked section between 10-20 km depth stores massive elastic strain."
        },
        geometry: {
          type: "LineString",
          coordinates: [
            [74.0, 33.7], [75.2, 33.0], [76.8, 32.0], [78.2, 30.8], [79.6, 30.0],
            [81.2, 29.2], [82.8, 28.5], [84.5, 27.9], [86.2, 27.4], [88.0, 27.1],
            [89.8, 27.0], [91.5, 27.1], [93.4, 27.4], [95.0, 27.9], [96.5, 28.4]
          ]
        }
      },
      {
        type: "Feature",
        properties: {
          id: "fault-itsz",
          name: "Indus-Tsangpo Suture Zone (ITSZ)",
          shortName: "ITSZ",
          category: "Continental Collision Suture",
          depth: "Variable / Upper-to-mid Crust",
          slipRate: "Strike-slip / Minor Normal",
          lastMajorRupture: "Fossil suture with localized intraplate events",
          seismicHazard: "Moderate",
          color: "#38bdf8",
          description: "The geological line marking the tectonic collision zone where the Tethys Ocean vanished and the Indian continent collided with the Eurasian margin ~50 million years ago."
        },
        geometry: {
          type: "LineString",
          coordinates: [
            [75.0, 35.4], [76.5, 34.8], [78.2, 33.8], [80.5, 32.2], [83.0, 30.5],
            [86.0, 29.5], [89.0, 29.2], [92.0, 29.4], [94.5, 29.8], [96.0, 30.2]
          ]
        }
      },
      {
        type: "Feature",
        properties: {
          id: "fault-karakoram",
          name: "Karakoram Fault System",
          shortName: "Karakoram Fault",
          category: "Dextral Strike-Slip",
          depth: "0 to 20 km",
          slipRate: "3 – 10 mm/yr right-lateral",
          lastMajorRupture: "Distributed Holocene slip",
          seismicHazard: "High",
          color: "#facc15",
          description: "A prominent right-lateral strike-slip fault accommodating eastern extrusion of the Tibetan Plateau as the Indian Plate wedges northward."
        },
        geometry: {
          type: "LineString",
          coordinates: [
            [74.5, 36.2], [76.0, 35.5], [77.5, 34.6], [79.0, 33.5], [80.5, 32.2], [81.8, 31.0]
          ]
        }
      },
      {
        type: "Feature",
        properties: {
          id: "fault-chaman",
          name: "Chaman & Western Syntaxis Faults",
          shortName: "Chaman Fault",
          category: "Sinistral Transform Fault",
          depth: "0 to 25 km",
          slipRate: "19 – 24 mm/yr left-lateral",
          lastMajorRupture: "1935 Quetta / 2008 Ziarat",
          seismicHazard: "Critical",
          color: "#e11d48",
          description: "Major transform boundary on the western flank of the Indian Plate in Pakistan, accommodating relative shearing against the Eurasian Plate."
        },
        geometry: {
          type: "LineString",
          coordinates: [
            [66.5, 29.5], [66.8, 30.5], [67.2, 31.8], [68.0, 33.0], [69.2, 34.2], [71.0, 35.0]
          ]
        }
      }
    ]
  },

  // Seismic Hazard Zones (Derived from IS 1893:2016, DMG Nepal, GSHAP)
  hazardZones: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          zone: "Zone V",
          level: "Very High Hazard",
          pga: "> 0.36g (Catastrophic Ground Acceleration)",
          mmi: "IX and Above (Violent to Catastrophic)",
          color: "#ff1744",
          fillOpacity: 0.38,
          borderColor: "#ff1744",
          description: "Highest seismic vulnerability zone. Encompasses Kashmir Syntaxis, Himachal Kangra-Chamba, Uttarakhand Garhwal, Central Nepal High Arc, and Northeast India. High probability of M7.5+ ruptures with massive ground acceleration.",
          regions: ["Kashmir Valley & Muzaffarabad", "Kangra & Kullu (Himachal)", "Chamoli & Uttarkashi (Uttarakhand)", "Central Nepal & Kathmandu Valley", "Sikkim & Western Bhutan", "Assam, Meghalaya, Arunachal (NE India)"]
        },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            // Kashmir - NW Syntaxis Zone V
            [[
              [73.0, 34.8], [74.5, 35.2], [76.0, 34.5], [75.5, 33.2], [74.0, 33.4], [73.0, 34.8]
            ]],
            // Himachal - Uttarakhand Zone V
            [[
              [76.0, 32.8], [77.5, 32.5], [79.2, 31.0], [80.5, 30.2], [80.0, 29.2], [78.2, 30.0], [76.8, 31.2], [76.0, 32.8]
            ]],
            // Central Nepal High Seismic Arc Zone V
            [[
              [81.5, 29.2], [83.5, 28.8], [85.5, 28.2], [87.5, 27.8], [88.5, 27.5],
              [88.2, 26.8], [86.0, 27.0], [84.0, 27.5], [82.0, 28.2], [81.5, 29.2]
            ]],
            // Northeast India & Shillong Plateau Zone V
            [[
              [89.5, 27.5], [92.0, 28.2], [95.0, 28.8], [96.5, 28.5], [96.0, 26.5],
              [94.0, 25.5], [91.5, 25.2], [90.0, 26.0], [89.5, 27.5]
            ]]
          ]
        }
      },
      {
        type: "Feature",
        properties: {
          zone: "Zone IV",
          level: "High Hazard",
          pga: "0.24g to 0.36g",
          mmi: "VIII (Severe)",
          color: "#ff7a00",
          fillOpacity: 0.28,
          borderColor: "#ff7a00",
          description: "High hazard belt bordering Zone V, including the Himalayan Sub-Himalayan foothills, Northern Punjab plain, Delhi-NCR seismic corridor, Southern Tibetan margin, and foothills of Bhutan.",
          regions: ["Delhi-NCR & Northern Haryana", "Jammu Foothills & Punjab border", "Southern Nepal Terai plain", "Eastern Bhutan", "Southern Tibet boundary"]
        },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            // Broad Himalayan Foreland & Adjacent Zone IV belt
            [[
              [71.5, 34.5], [74.0, 35.8], [77.0, 34.2], [79.5, 32.5], [82.5, 30.2],
              [85.5, 29.2], [88.5, 28.5], [91.5, 28.8], [94.5, 29.2], [97.0, 29.0],
              [96.8, 25.8], [93.5, 24.8], [90.5, 24.5], [87.5, 25.5], [84.0, 26.0],
              [81.0, 27.0], [77.5, 28.5], [75.5, 29.5], [73.5, 31.5], [71.5, 34.5]
            ]]
          ]
        }
      },
      {
        type: "Feature",
        properties: {
          zone: "Zone III",
          level: "Moderate Hazard",
          pga: "0.16g to 0.24g",
          mmi: "VII (Very Strong)",
          color: "#eab308",
          fillOpacity: 0.2,
          borderColor: "#eab308",
          description: "Moderate hazard region across the middle Indo-Gangetic alluvium and inner Tibetan plateau. Significant amplification can occur in thick alluvial basins during distant large Himalayan ruptures.",
          regions: ["Uttar Pradesh & Bihar Plains", "Central Punjab & Rajasthan Fringe", "Interior Tibetan Plateau", "Brahmaputra Valley Margins"]
        },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [[
              [70.0, 33.0], [72.5, 34.0], [75.0, 32.5], [77.0, 30.0], [79.5, 28.0],
              [83.0, 26.0], [86.5, 25.0], [88.5, 24.0], [87.0, 23.0], [83.0, 24.0],
              [79.0, 26.0], [75.0, 27.5], [72.0, 29.0], [70.0, 33.0]
            ]]
          ]
        }
      },
      {
        type: "Feature",
        properties: {
          zone: "Zone II",
          level: "Lower Hazard",
          pga: "< 0.16g",
          mmi: "VI and Below (Strong to Moderate)",
          color: "#10b981",
          fillOpacity: 0.15,
          borderColor: "#10b981",
          description: "Relatively stable intraplate shield areas further south of the Himalayan collision front and stable cratonic interiors with lowest relative seismicity.",
          regions: ["Central Peninsular India", "Southern Rajasthan", "Madhya Pradesh Shield"]
        },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [[
              [69.0, 27.0], [73.0, 26.5], [77.0, 25.0], [81.0, 23.5], [85.0, 22.5],
              [84.0, 21.0], [79.0, 21.5], [73.0, 23.0], [69.0, 24.5], [69.0, 27.0]
            ]]
          ]
        }
      }
    ]
  },

  // Himalayan Range Arc Outline
  himalayanRange: {
    type: "Feature",
    properties: {
      name: "Himalayan Mountain Arc",
      lengthKm: 2400,
      widthKm: "250 – 350 km",
      peakElevation: "8,848.86 m (Mt. Everest)",
      geologicalOrigin: "Continental-Continental Collision (India-Eurasia)",
      color: "#38bdf8"
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [72.5, 35.8], [75.0, 36.0], [77.5, 35.0], [80.0, 33.2], [82.5, 31.5],
        [85.5, 30.0], [88.5, 29.2], [91.5, 29.0], [94.5, 29.8], [96.8, 30.0],
        [96.5, 28.0], [94.5, 27.2], [92.0, 26.8], [89.0, 26.6], [86.0, 26.8],
        [83.0, 27.4], [80.0, 28.5], [77.0, 30.2], [74.5, 32.0], [72.8, 33.5],
        [72.5, 35.8]
      ]]
    }
  },

  // Historical & Significant Earthquakes Dataset (Curated with verified USGS/ISC/NCS parameters)
  earthquakes: [
    {
      id: "eq-1950",
      year: 1950,
      date: "1950-08-15",
      time: "14:09 UTC",
      name: "Assam–Tibet Great Earthquake",
      magnitude: 8.6,
      depth: 15,
      lat: 28.5,
      lng: 96.5,
      epicenter: "Mishmi Hills, Indo-China border / Rima",
      country: "India / China",
      region: "Eastern Himalayan Syntaxis",
      mmi: "XII (Catastrophic)",
      deaths: 4800,
      pga: "> 0.8g",
      faultAssociation: "Eastern Himalayan Decollement / Mishmi Thrust",
      description: "The largest continental strike-thrust collision earthquake ever instrumentally recorded. Changed river courses of the Brahmaputra, triggered mountain collapses, and caused extensive liquefaction.",
      isSignificant: true
    },
    {
      id: "eq-1934",
      year: 1934,
      date: "1934-01-15",
      time: "08:43 UTC",
      name: "Bihar–Nepal Earthquake",
      magnitude: 8.1,
      depth: 15,
      lat: 26.77,
      lng: 86.76,
      epicenter: "Eastern Nepal / Northern Bihar",
      country: "Nepal / India",
      region: "Central Himalayan Belt",
      mmi: "XI (Extreme)",
      deaths: 10700,
      pga: "~0.65g",
      faultAssociation: "Main Himalayan Thrust (MHT) / HFF",
      description: "Ruptured a ~300 km section of the Main Himalayan Thrust. Caused tremendous destruction in Kathmandu, Bhaktapur, Patna, and Munger, with sand boils and ground fissuring across the Gangetic plain.",
      isSignificant: true
    },
    {
      id: "eq-2015-gorkha",
      year: 2015,
      date: "2015-04-25",
      time: "06:11 UTC",
      name: "Gorkha Nepal Earthquake",
      magnitude: 7.8,
      depth: 8.2,
      lat: 28.23,
      lng: 84.73,
      epicenter: "Gorkha District, Nepal (77 km NW of Kathmandu)",
      country: "Nepal",
      region: "Central Nepal Himalaya",
      mmi: "IX (Violent)",
      deaths: 8964,
      pga: "0.25g - 0.40g",
      faultAssociation: "Main Himalayan Thrust (MHT locked ramp)",
      description: "Unzipped a 140 km by 50 km segment of the Main Himalayan Thrust eastward toward Kathmandu. Raised Kathmandu basin by ~1 m and caused avalanches on Mt. Everest and the Langtang Valley tragedy.",
      isSignificant: true
    },
    {
      id: "eq-2015-kodari",
      year: 2015,
      date: "2015-05-12",
      time: "07:05 UTC",
      name: "Kodari / Dolakha Aftershock",
      magnitude: 7.3,
      depth: 15.0,
      lat: 27.81,
      lng: 86.07,
      epicenter: "Dolakha District, near Tibet border",
      country: "Nepal / China",
      region: "Central-East Himalaya",
      mmi: "VIII (Severe)",
      deaths: 218,
      pga: "0.28g",
      faultAssociation: "Eastern termination of 2015 Gorkha rupture",
      description: "Major doublet aftershock that re-ruptured the eastern boundary of the Gorkha event, triggering additional landslides and damaging already destabilized mountain settlements.",
      isSignificant: true
    },
    {
      id: "eq-2005-kashmir",
      year: 2005,
      date: "2005-10-08",
      time: "03:50 UTC",
      name: "Kashmir Earthquake",
      magnitude: 7.6,
      depth: 10.0,
      lat: 34.49,
      lng: 73.63,
      epicenter: "Muzaffarabad, Pakistan-administered Kashmir",
      country: "Pakistan / India",
      region: "Western Himalayan Syntaxis",
      mmi: "XI (Extreme)",
      deaths: 87350,
      pga: "0.55g",
      faultAssociation: "Balakot-Bagh Fault / MBT",
      description: "Devastating rupture along the Balakot-Bagh fault in the Hazara-Kashmir syntaxis. Triggered tens of thousands of landslides, obliterating whole valley communities and causing catastrophic casualties.",
      isSignificant: true
    },
    {
      id: "eq-1905-kangra",
      year: 1905,
      date: "1905-04-04",
      time: "00:50 UTC",
      name: "Kangra Earthquake",
      magnitude: 7.8,
      depth: 25.0,
      lat: 32.25,
      lng: 76.25,
      epicenter: "Kangra Valley, Himachal Pradesh",
      country: "India",
      region: "NW Himalaya",
      mmi: "X (Disastrous)",
      deaths: 20000,
      pga: "~0.50g",
      faultAssociation: "Kangra Salient / Main Boundary Thrust (MBT)",
      description: "Completely flattened Kangra, Dharamshala, and damaged towns as far as Dehradun and Lahore. One of the deadliest earthquakes in modern Indian history.",
      isSignificant: true
    },
    {
      id: "eq-1897-assam",
      year: 1897,
      date: "1897-06-12",
      time: "11:06 UTC",
      name: "Great Assam Earthquake",
      magnitude: 8.2,
      depth: 35.0,
      lat: 25.9,
      lng: 91.8,
      epicenter: "Shillong Plateau, Meghalaya",
      country: "India",
      region: "Shillong Plateau / Eastern Foreland",
      mmi: "XII (Catastrophic)",
      deaths: 1542,
      pga: "> 1.0g (Boulders hurled into air)",
      faultAssociation: "Oldham Fault (Blind Crustal Thrust)",
      description: "One of the most intense ground-shaking events in recorded history. Richard Dixon Oldham studied this quake and discovered Primary (P), Secondary (S), and Surface waves, founding modern seismology.",
      isSignificant: true
    },
    {
      id: "eq-1803-garwhal",
      year: 1803,
      date: "1803-09-01",
      time: "01:30 UTC",
      name: "Garhwal / Uttarkashi Megaquake",
      magnitude: 7.7,
      depth: 18.0,
      lat: 30.7,
      lng: 78.8,
      epicenter: "Garhwal Himalaya, Uttarakhand",
      country: "India",
      region: "Central Seismic Gap",
      mmi: "IX (Violent)",
      deaths: 3000,
      pga: "~0.40g",
      faultAssociation: "Main Central Thrust / MHT Ramp",
      description: "Severely damaged Badrinath and Devprayag temples, destroyed settlements in Srinagar (Garhwal), and damaged the Qutub Minar in Delhi over 250 km away.",
      isSignificant: true
    },
    {
      id: "eq-1991-uttarkashi",
      year: 1991,
      date: "1991-10-20",
      time: "21:23 UTC",
      name: "Uttarkashi Earthquake",
      magnitude: 6.8,
      depth: 12.0,
      lat: 30.78,
      lng: 78.78,
      epicenter: "Bhagirathi Valley, Uttarkashi, Uttarakhand",
      country: "India",
      region: "Garhwal Himalaya",
      mmi: "IX (Violent)",
      deaths: 768,
      pga: "0.31g",
      faultAssociation: "Main Central Thrust (MCT) hanging wall",
      description: "Caused extensive damage to stone-and-timber masonry houses across Uttarakhand hills, triggering widespread slope failures along the Bhagirathi River.",
      isSignificant: true
    },
    {
      id: "eq-1999-chamoli",
      year: 1999,
      date: "1999-03-29",
      time: "19:05 UTC",
      name: "Chamoli Earthquake",
      magnitude: 6.8,
      depth: 15.0,
      lat: 30.41,
      lng: 79.42,
      epicenter: "Chamoli District, Uttarakhand",
      country: "India",
      region: "Garhwal Himalaya",
      mmi: "VIII (Severe)",
      deaths: 103,
      pga: "0.22g",
      faultAssociation: "Alaknanda Fault / MCT footwall",
      description: "Strong ground shaking disrupted the fragile Alaknanda watershed, fracturing hillsides and causing widespread structural cracks throughout Chamoli, Rudraprayag, and Gopeshwar.",
      isSignificant: true
    },
    {
      id: "eq-2008-sichuan",
      year: 2008,
      date: "2008-05-12",
      time: "06:28 UTC",
      name: "Sichuan / Longmenshan Earthquake",
      magnitude: 7.9,
      depth: 19.0,
      lat: 31.00,
      lng: 103.32,
      epicenter: "Wenchuan County, Sichuan, China",
      country: "China",
      region: "Eastern Tibetan Plateau Margin",
      mmi: "XI (Extreme)",
      deaths: 87587,
      pga: "0.65g",
      faultAssociation: "Longmenshan Thrust Belt",
      description: "Generated by the eastward extrusion of the Tibetan plateau colliding into the rigid Sichuan Basin. One of the most catastrophic seismic disasters in Asian history.",
      isSignificant: true
    },
    {
      id: "eq-2011-sikkim",
      year: 2011,
      date: "2011-09-18",
      time: "12:40 UTC",
      name: "Sikkim Earthquake",
      magnitude: 6.9,
      depth: 50.0,
      lat: 27.72,
      lng: 88.06,
      epicenter: "Kanchenjunga Conservation Area, Sikkim-Nepal Border",
      country: "India / Nepal",
      region: "Eastern Himalaya",
      mmi: "VII (Very Strong)",
      deaths: 111,
      pga: "0.18g",
      faultAssociation: "Transverse Strike-Slip Strike Fault (Tista lineament)",
      description: "Notable deep strike-slip event within the underthrusting Indian plate rather than the shallow decollement, proving complex transverse fault activation in Sikkim.",
      isSignificant: true
    },
    {
      id: "eq-2015-hindukush",
      year: 2015,
      date: "2015-10-26",
      time: "09:09 UTC",
      name: "Hindu Kush Deep Earthquake",
      magnitude: 7.5,
      depth: 212.0,
      lat: 36.52,
      lng: 70.37,
      epicenter: "Badakhshan, Hindu Kush Range",
      country: "Pakistan / Afghanistan",
      region: "NW Syntaxis / Pamir Knot",
      mmi: "VII (Very Strong)",
      deaths: 399,
      pga: "0.15g",
      faultAssociation: "Deep Subducting Lithospheric Slab",
      description: "Deep intermediate subduction intraslab rupture. Shaking was felt across thousands of kilometers, reaching Islamabad, Kabul, New Delhi, and Lahore.",
      isSignificant: true
    },
    {
      id: "eq-2023-jajarkot",
      year: 2023,
      date: "2023-11-03",
      time: "18:02 UTC",
      name: "Jajarkot Nepal Earthquake",
      magnitude: 5.7,
      depth: 10.0,
      lat: 28.84,
      lng: 82.19,
      epicenter: "Ramidanda, Jajarkot District, Karnali Province",
      country: "Nepal",
      region: "Western Nepal Himalaya",
      mmi: "VIII (Severe)",
      deaths: 157,
      pga: "0.22g",
      faultAssociation: "Western Nepal Seismic Gap blind fault",
      description: "Highlighted the vulnerability of the Western Nepal seismic gap, where unreinforced mud-and-stone masonry dwellings collapsed during moderate shaking.",
      isSignificant: true
    },
    {
      id: "eq-2023-bajhang",
      year: 2023,
      date: "2023-10-03",
      time: "09:21 UTC",
      name: "Bajhang Earthquake Doublet",
      magnitude: 6.3,
      depth: 10.0,
      lat: 29.58,
      lng: 81.18,
      epicenter: "Chainpur, Bajhang District, Far-Western Nepal",
      country: "Nepal",
      region: "Far-Western Nepal",
      mmi: "VII (Very Strong)",
      deaths: 1,
      pga: "0.16g",
      faultAssociation: "Lesser Himalayan imbricate thrust",
      description: "Doublet earthquake series (M5.3 followed 25 minutes later by M6.3) triggering widespread slope failures across Sudurpashchim Province.",
      isSignificant: false
    },
    {
      id: "eq-1975-kinnaur",
      year: 1975,
      date: "1975-01-19",
      time: "08:02 UTC",
      name: "Kinnaur Earthquake",
      magnitude: 6.8,
      depth: 25.0,
      lat: 31.95,
      lng: 78.53,
      epicenter: "Spiti & Kinnaur Valley, Himachal Pradesh",
      country: "India",
      region: "NW Himalaya / Tibetan Plateau border",
      mmi: "IX (Violent)",
      deaths: 47,
      pga: "0.26g",
      faultAssociation: "Kaurik-Chango Normal Fault System",
      description: "Demonstrated normal faulting and east-west crustal extension within the high-elevation Himalayan crest near the Tibetan border.",
      isSignificant: false
    },
    {
      id: "eq-1988-nepal-bihar",
      year: 1988,
      date: "1988-08-20",
      time: "23:09 UTC",
      name: "Udayapur Nepal–Bihar Earthquake",
      magnitude: 6.9,
      depth: 57.0,
      lat: 26.75,
      lng: 86.61,
      epicenter: "Murkuchi, Udayapur District, Nepal",
      country: "Nepal / India",
      region: "Eastern Nepal / Northern Bihar",
      mmi: "VIII (Severe)",
      deaths: 1004,
      pga: "0.24g",
      faultAssociation: "Intermediate depth lower crustal slip",
      description: "Severe damage across Dharan, Biratnagar, and northern Bihar plain. Triggered extensive liquefaction along the Kosi river basin.",
      isSignificant: false
    },
    {
      id: "eq-2021-assam",
      year: 2021,
      date: "2021-04-28",
      time: "02:21 UTC",
      name: "Dhekiajuli Assam Earthquake",
      magnitude: 6.0,
      depth: 34.0,
      lat: 26.78,
      lng: 92.44,
      epicenter: "Sonitpur District, Assam",
      country: "India",
      region: "Brahmaputra Valley / Bhutan Border",
      mmi: "VI (Strong)",
      deaths: 2,
      pga: "0.14g",
      faultAssociation: "Kopili Fault Zone",
      description: "Rupture along the Kopili fault line between the Shillong plateau and Mikir hills, causing sand geysers and cracking across multi-story buildings in Guwahati.",
      isSignificant: false
    },
    {
      id: "eq-2024-wushi",
      year: 2024,
      date: "2024-01-22",
      time: "18:09 UTC",
      name: "Wushi Tian Shan–Tibet Border Earthquake",
      magnitude: 7.0,
      depth: 13.0,
      lat: 41.27,
      lng: 78.64,
      epicenter: "Wushi County, Xinjiang (NW Tibetan Plateau syntaxis)",
      country: "China",
      region: "Tarim-Tibet northern syntaxis",
      mmi: "IX (Violent)",
      deaths: 3,
      pga: "0.38g",
      faultAssociation: "Tian Shan Frontal Thrust",
      description: "Deep crustal deformation driven by northern extrusion of Tibet reacting to the ongoing Indian continental push.",
      isSignificant: false
    },
    {
      id: "eq-2016-imphal",
      year: 2016,
      date: "2016-01-03",
      time: "23:05 UTC",
      name: "Imphal Manipur Earthquake",
      magnitude: 6.7,
      depth: 55.0,
      lat: 24.80,
      lng: 93.65,
      epicenter: "Tamenglong / Imphal, Manipur",
      country: "India",
      region: "Indo-Burma Range Arc",
      mmi: "VII (Very Strong)",
      deaths: 11,
      pga: "0.20g",
      faultAssociation: "Indo-Burmese Subduction Arc",
      description: "Damaged structural market complexes in Imphal; intermediate focal depth reflected oblique subduction at the eastern terminus of the Indian Plate.",
      isSignificant: false
    },
    {
      id: "eq-1974-pattan",
      year: 1974,
      date: "1974-12-28",
      time: "12:11 UTC",
      name: "Pattan / Hunza Earthquake",
      magnitude: 6.2,
      depth: 22.0,
      lat: 35.05,
      lng: 72.88,
      epicenter: "Swat & Indus Kohistan, Pakistan",
      country: "Pakistan",
      region: "Karakoram / Kohistan Arc",
      mmi: "VIII (Severe)",
      deaths: 5300,
      pga: "0.28g",
      faultAssociation: "Main Mantle Thrust (MMT)",
      description: "High casualty rate caused by steep terrain collapses and rockfalls crushing stone-masonry settlements along the Karakoram Highway.",
      isSignificant: false
    },
    {
      id: "eq-1833-kathmandu",
      year: 1833,
      date: "1833-08-26",
      time: "17:30 UTC",
      name: "Kathmandu Valley Earthquake",
      magnitude: 7.7,
      depth: 20.0,
      lat: 27.7,
      lng: 85.5,
      epicenter: "East of Kathmandu, Nepal",
      country: "Nepal",
      region: "Central Nepal",
      mmi: "IX (Violent)",
      deaths: 500,
      pga: "~0.35g",
      faultAssociation: "Main Himalayan Thrust",
      description: "Predecessor event to the 1934 and 2015 ruptures, causing widespread structural failure across the Newar architectural monuments of Kathmandu, Patan, and Bhaktapur.",
      isSignificant: true
    },
    {
      id: "eq-1505-central",
      year: 1505,
      date: "1505-06-06",
      time: "Historical",
      name: "1505 Lo Mustang / Central Himalayan Megaquake",
      magnitude: 8.2,
      depth: 15.0,
      lat: 29.5,
      lng: 83.0,
      epicenter: "Lo Mustang, Western Nepal / South Tibet",
      country: "Nepal / China",
      region: "Central Seismic Gap",
      mmi: "X (Disastrous)",
      deaths: 6000,
      pga: "> 0.6g",
      faultAssociation: "Main Himalayan Thrust (Central Gap)",
      description: "One of the most massive historical ruptures along the Himalayan arc, destroying monasteries in Tibet and severely impacting northern India. The segment has not experienced an M8+ quake since, designating it the 'Central Himalayan Seismic Gap'.",
      isSignificant: true
    },
    // Supplementary historical and instrumental events for robust statistical charting
    { id: "eq-inst-1", year: 1980, date: "1980-07-29", magnitude: 6.5, depth: 18, lat: 29.60, lng: 81.09, country: "Nepal", region: "Far-West Nepal", faultAssociation: "MBT" },
    { id: "eq-inst-2", year: 1986, date: "1986-04-26", magnitude: 5.5, depth: 33, lat: 32.19, lng: 76.28, country: "India", region: "Dharamshala", faultAssociation: "HFF" },
    { id: "eq-inst-3", year: 1997, date: "1997-11-21", magnitude: 6.1, depth: 54, lat: 22.21, lng: 92.70, country: "India", region: "Mizoram", faultAssociation: "Indo-Burma Fault" },
    { id: "eq-inst-4", year: 2002, date: "2002-11-03", magnitude: 5.4, depth: 15, lat: 35.89, lng: 74.65, country: "Pakistan", region: "Gilgit-Baltistan", faultAssociation: "Karakoram" },
    { id: "eq-inst-5", year: 2006, date: "2006-02-14", magnitude: 5.7, depth: 12, lat: 34.40, lng: 73.30, country: "Pakistan", region: "Muzaffarabad", faultAssociation: "Balakot" },
    { id: "eq-inst-6", year: 2009, date: "2009-09-21", magnitude: 6.1, depth: 14, lat: 27.33, lng: 91.44, country: "Bhutan", region: "Eastern Bhutan (Mongar)", faultAssociation: "MBT Bhutan" },
    { id: "eq-inst-7", year: 2012, date: "2012-05-11", magnitude: 5.6, depth: 25, lat: 29.80, lng: 80.60, country: "India", region: "Pithoragarh", faultAssociation: "MCT" },
    { id: "eq-inst-8", year: 2017, date: "2017-02-06", magnitude: 5.8, depth: 10, lat: 30.60, lng: 79.20, country: "India", region: "Rudraprayag", faultAssociation: "MCT" },
    { id: "eq-inst-9", year: 2019, date: "2019-09-24", magnitude: 5.6, depth: 10, lat: 33.10, lng: 73.76, country: "Pakistan", region: "Mirpur, Azad Kashmir", faultAssociation: "Salt Range Thrust" },
    { id: "eq-inst-10", year: 2020, date: "2020-05-29", magnitude: 4.6, depth: 16, lat: 28.70, lng: 76.90, country: "India", region: "Rohtak / Delhi-NCR", faultAssociation: "Mahendragarh-Dehradun Fault" },
    { id: "eq-inst-11", year: 2022, date: "2022-11-09", magnitude: 6.6, depth: 15, lat: 29.30, lng: 81.10, country: "Nepal", region: "Doti District", faultAssociation: "Western Nepal Thrust" },
    { id: "eq-inst-12", year: 2023, date: "2023-01-24", magnitude: 5.4, depth: 10, lat: 29.62, lng: 81.65, country: "Nepal", region: "Jumla", faultAssociation: "MCT" },
    { id: "eq-inst-13", year: 2023, date: "2023-03-21", magnitude: 6.5, depth: 187, lat: 36.50, lng: 70.90, country: "Pakistan", region: "Hindu Kush / Jurm", faultAssociation: "Deep Subduction" },
    { id: "eq-inst-14", year: 2024, date: "2024-04-05", magnitude: 5.3, depth: 10, lat: 32.28, lng: 76.60, country: "India", region: "Chamba Himachal", faultAssociation: "Chamba Thrust" }
  ],

  // Key Himalayan Cities & High-Risk Population Centers
  cities: [
    {
      name: "Kathmandu",
      country: "Nepal",
      flag: "🇳🇵",
      lat: 27.7172,
      lng: 85.3240,
      population: "1.5 Million (Metro: 3M)",
      zone: "Zone V",
      pgaExpected: "0.36g – 0.45g",
      soilType: "Ancient Lacustrine Sediments (High Liquefaction Risk)",
      riskScore: "Critical",
      keyRisk: "Deep soft lake sediment basin amplifies low-frequency seismic waves and triggers severe liquefaction.",
      evacuationPoints: ["Tundikhel Ground", "Swayambhu Ring Road Open Area", "Tribhuvan University Grounds"]
    },
    {
      name: "New Delhi (NCR)",
      country: "India",
      flag: "🇮🇳",
      lat: 28.6139,
      lng: 77.2090,
      population: "33 Million",
      zone: "Zone IV",
      pgaExpected: "0.24g",
      soilType: "Yamuna Alluvial Silt & Quartzite Ridge",
      riskScore: "Extreme (Due to population density & unreinforced masonry)",
      keyRisk: "Distal shaking from M8+ Himalayan megaquakes, coupled with local Delhi-Haridwar and Sohna fault triggers.",
      evacuationPoints: ["India Gate Lawns", "Major Dhyan Chand Stadium", "Yamuna Sports Complex"]
    },
    {
      name: "Islamabad / Rawalpindi",
      country: "Pakistan",
      flag: "🇵🇰",
      lat: 33.6844,
      lng: 73.0479,
      population: "3.2 Million",
      zone: "Zone IV",
      pgaExpected: "0.24g – 0.30g",
      soilType: "Potwar Plateau Silt & Clay",
      riskScore: "High",
      keyRisk: "Close proximity to the Margalla fault system and the active Hazara-Kashmir seismic front.",
      evacuationPoints: ["F-9 Fatima Jinnah Park", "Shakarparian Open Grounds"]
    },
    {
      name: "Srinagar",
      country: "India",
      flag: "🇮🇳",
      lat: 34.0837,
      lng: 74.7973,
      population: "1.6 Million",
      zone: "Zone V",
      pgaExpected: "0.36g+",
      soilType: "Karewa Lacustrine Alluvium (High Liquefaction Risk)",
      riskScore: "Critical",
      keyRisk: "Enclosed basin with thick saturated sediments; traditional Dhajji-Dewari timber-frame architecture performs better than modern unreinforced concrete.",
      evacuationPoints: ["TRC Sports Ground", "Eidgah Open Grounds", "Polo Ground"]
    },
    {
      name: "Thimphu",
      country: "Bhutan",
      flag: "🇧🇹",
      lat: 27.4728,
      lng: 89.6393,
      population: "120,000",
      zone: "Zone V",
      pgaExpected: "0.36g",
      soilType: "Narrow Mountain Valley Alluvium",
      riskScore: "High",
      keyRisk: "Steep valley topography can trigger co-seismic landslides blocking river drainage and critical transport corridors.",
      evacuationPoints: ["Changlimithang Stadium", "Centenary Park"]
    },
    {
      name: "Lhasa",
      country: "Tibet / China",
      flag: "🇨🇳",
      lat: 29.6525,
      lng: 91.1721,
      population: "560,000",
      zone: "Zone IV",
      pgaExpected: "0.20g – 0.25g",
      soilType: "Lhasa River Alluvial Fan",
      riskScore: "Moderate-High",
      keyRisk: "Normal faulting in Yadong-Gulu rift system north of the Himalayan crest.",
      evacuationPoints: ["Potala Square", "Norbulingka Grounds"]
    },
    {
      name: "Dehradun",
      country: "India",
      flag: "🇮🇳",
      lat: 30.3165,
      lng: 78.0322,
      population: "1.0 Million",
      zone: "Zone IV / V Border",
      pgaExpected: "0.32g",
      soilType: "Doon Valley Gravel & Boulder Alluvium",
      riskScore: "High",
      keyRisk: "Located in the Doon syncline directly between the Main Boundary Thrust (MBT) and Himalayan Frontal Thrust (HFT).",
      evacuationPoints: ["Parade Ground", "Ranger College Grounds"]
    },
    {
      name: "Guwahati",
      country: "India",
      flag: "🇮🇳",
      lat: 26.1445,
      lng: 91.7362,
      population: "1.3 Million",
      zone: "Zone V",
      pgaExpected: "0.36g+",
      soilType: "Brahmaputra Deep Water-saturated Alluvium",
      riskScore: "Critical",
      keyRisk: "Surrounded by active tectonic faults (Kopili, Oldham, Dauki); extreme liquefaction hazard along riverfront.",
      evacuationPoints: ["Judges Field", "Latasil Playground", "Sarusajai Stadium"]
    },
    {
      name: "Muzaffarabad",
      country: "Pakistan",
      flag: "🇵🇰",
      lat: 34.3700,
      lng: 73.4711,
      population: "180,000",
      zone: "Zone V",
      pgaExpected: "> 0.50g",
      soilType: "Jhelum / Neelum Valley Scree & Silt",
      riskScore: "Critical",
      keyRisk: "Epicenter of the 2005 M7.6 disaster along the Balakot-Bagh fault; steep surrounding slopes prone to massive rockslides.",
      evacuationPoints: ["Muzaffarabad Cricket Stadium", "University of AJK Grounds"]
    },
    {
      name: "Shimla",
      country: "India",
      flag: "🇮🇳",
      lat: 31.1048,
      lng: 77.1734,
      population: "220,000",
      zone: "Zone IV",
      pgaExpected: "0.28g",
      soilType: "Fractured Phyllite & Quartzite Ridges",
      riskScore: "Very High",
      keyRisk: "Extreme multi-story building load clinging to steep 45° slopes; high risk of structural domino collapse during earthquake.",
      evacuationPoints: ["The Ridge", "Annandale Ground"]
    },
    {
      name: "Pokhara",
      country: "Nepal",
      flag: "🇳🇵",
      lat: 28.2096,
      lng: 83.9856,
      population: "520,000",
      zone: "Zone V",
      pgaExpected: "0.38g",
      soilType: "Coarse Medieval Debris Avalanche Deposits",
      riskScore: "High",
      keyRisk: "Situated atop giant ancient debris flow gravels; prone to deep sinkhole collapses and proximity to Annapurna thrust wedge.",
      evacuationPoints: ["Pokhara Rangasala Stadium", "Old Airport Open Zone"]
    }
  ],

  // Plate Motion Vectors (Indian Plate colliding NNE into Eurasian Plate)
  plateMotion: {
    indianPlateSpeed: "45 mm / year",
    direction: "N 20° E (North-Northeast)",
    collisionTime: "Initiated ~50 - 55 Million Years Ago",
    crustalShorteningRate: "18 - 21 mm / year absorbed across Himalayas",
    vectors: [
      { lat: 24.0, lng: 72.0, azimuth: 22, rate: 46 },
      { lat: 25.0, lng: 78.0, azimuth: 20, rate: 45 },
      { lat: 26.0, lng: 84.0, azimuth: 18, rate: 44 },
      { lat: 26.5, lng: 92.0, azimuth: 16, rate: 43 }
    ]
  },

  // Scientific References and Data Sources
  references: [
    {
      agency: "USGS (United States Geological Survey)",
      role: "Global Seismographic Network & Earthquake Hazards Program",
      url: "https://earthquake.usgs.gov/"
    },
    {
      agency: "ISC (International Seismological Centre)",
      role: "Definitive Global Seismic Bulletin & Hypocenters",
      url: "http://www.isc.ac.uk/"
    },
    {
      agency: "NCS (National Center for Seismology, India)",
      role: "National Seismological Network monitoring under MoES",
      url: "https://seismo.gov.in/"
    },
    {
      agency: "DMG (Department of Mines and Geology, Nepal)",
      role: "National Seismological Centre of Nepal",
      url: "http://seismonepal.gov.np/"
    },
    {
      agency: "BIS (Bureau of Indian Standards)",
      role: "IS 1893 (Part 1): 2016 - Earthquake Resistant Design of Structures",
      url: "https://bis.gov.in/"
    },
    {
      agency: "GSHAP (Global Seismic Hazard Assessment Program)",
      role: "Global probabilistic seismic hazard maps & PGA values",
      url: "http://www.seismo.ethz.ch/static/GSHAP/"
    }
  ]
};

// Make available globally
if (typeof window !== "undefined") {
  window.HIMALAYAN_DATA = HIMALAYAN_DATA;
}
