/**
 * Pride World City - Master Township Dataset
 * Comprehensive data model covering 400+ Acres Integrated Township in Charholi, Pune
 */

const TOWNSHIP_DATA = {
  brand: {
    name: "Pride World City",
    tagline: "The 400-Acre Global Metropolis in Charholi, Pune",
    subtext: "Live, Work, Learn, and Play in Pune's Most Celebrated Integrated Mega Township",
    developer: "Pride Group",
    legacyYears: "28+",
    totalAcreage: "Approximately 400 Acres",
    familiesCount: "10,000+",
    completedArea: "5 Million Sq. Ft.",
    underConstructionArea: "8 Million+ Sq. Ft.",
    unitsDelivered: "5,000+",
    openGreenSpace: "70%",
    phone: "+91 77440 09295",
    email: "propsmartrealty@gmail.com",
    logo: "assets/images/pride-world-city-logo.svg",
    address: "Pride World City, Adjacent to D.Y. Patil Knowledge City, Charholi Budruk, Pune - 412105, Maharashtra, India",
    reraWebsite: "https://maharera.mahaonline.gov.in"
  },

  keyHighlights: [
    { number: "400", label: "Acres Masterplan", desc: "Integrated mega township in Charholi" },
    { number: "10,000+", label: "Township Families", desc: "Thriving multi-generational community" },
    { number: "5M+ Sq.Ft", label: "Completed Area", desc: "World-class delivered infrastructure" },
    { number: "8M+ Sq.Ft", label: "Under Construction", desc: "Rapidly expanding residential & tech hubs" },
    { number: "10 Mins", label: "To Pune Int'l Airport", desc: "Unmatched prime connectivity corridor" },
    { number: "11", label: "Clusters & Tech Park", desc: "Valencia, Miami, Boston, Montreal & more" }
  ],

  clusters: [
    {
      id: "valencia",
      name: "Valencia",
      badge: "★ NEW LAUNCH",
      status: "New Launch • 5.9 Acres, 5 Towers",
      type: "2 & 3 BHK East-West Facing Sun-Side Homes",
      configurations: ["2 BHK", "3 BHK"],
      priceStarting: "₹ 92.49 L* All Inclusive",
      priceNumber: 9249000,
      carpetArea: "755 - 1,180 sq. ft.",
      towers: "5 Elegant High-Rise Towers (G + 28 Floors)",
      reraNo: "P52100052309",
      tagline: "Hola to the Brighter Side of Life",
      description: "A new chapter at Pride World City. Sited across 5.9 acres with 5 signature towers, Valencia offers 100% East-West facing sun-side residences where the sun becomes part of your everyday lifestyle. Unobstructed morning sunrise, evening golden twilight, and 20+ curated amenities.",
      image: "assets/images/Twilight-Valencia-Apartment-Launch-Banner.webp.bv.webp",
      entranceImage: "assets/images/19-entrance-evening-838x386.jpg",
      masterLayoutImage: "assets/images/11-original.png",
      masterLayout: "assets/images/11-original.png",
      logo: "assets/images/Pride-World-City-Valencia-Logo.webp",
      accentColor: "#f43f5e",
      features: [
        "100% East-West Facing Towers (Sun-Side Living)",
        "5.9 Acres Self-Sustained Master Enclave",
        "Swimming Pool & Dedicated Kids Pool",
        "Pickleball Court, Open Gym & Jogging Loop",
        "Forest Trail, Butterfly Park & Biodiversity Garden",
        "Pet Park & Dedicated Senior Citizen Plaza"
      ],
      floorPlans: [
        {
          name: "2 BHK Sun-Side Residence",
          carpet: "755 - 795 sq. ft.",
          balcony: "72 sq. ft.",
          price: "₹ 92.49 L* Onwards (All Inclusive)",
          orientation: "100% East-West Open (All-Day Sun)",
          rooms: "2 Bedrooms, 2 Bathrooms, Living, Dining, Kitchen, Utility, Sun-Deck",
          planImage: "assets/images/2-BHK-S-Boston.jpg.bv.webp",
          svgType: "2bhk"
        },
        {
          name: "3 BHK Grand Sun-Side Suite",
          carpet: "1,045 - 1,180 sq. ft.",
          balcony: "125 sq. ft.",
          price: "₹ 1.23 Cr* Onwards (All Inclusive)",
          orientation: "Cross-Ventilated East-West Skyline",
          rooms: "3 Bedrooms, 3 Bathrooms, Foyer, Living, Dining, Kitchen, Dual Decks",
          planImage: "assets/images/2-BHK-L-Boston.jpg.bv.webp",
          svgType: "3bhk"
        }
      ]
    },
    {
      id: "kingsbury",
      name: "Kingsbury",
      badge: "Best Seller",
      status: "Ready to Move / Few Units Left",
      type: "Luxury High-Rise Residences",
      configurations: ["2 BHK", "3 BHK"],
      priceStarting: "₹ 78 Lacs*",
      priceNumber: 7800000,
      carpetArea: "765 - 1,120 sq. ft.",
      towers: "14 High-Rise Towers (G + 14 / 21 Floors)",
      reraNo: "P52100000854",
      tagline: "Regal Elegance in the Heart of the Township",
      description: "Inspired by royal British architecture, Kingsbury stands tall as the signature high-rise landmark of Pride World City. Featuring wide private sundecks, Italian marble finishes in lobbies, panoramic valley views, and dedicated cluster clubhouses.",
      image: "assets/images/Scene_01_aerial-view.webp",
      accentColor: "#D4AF37",
      features: [
        "Grand Double-height Entrance Lobby",
        "Temperature-controlled Indoor Splash Pool",
        "Sky Lounge on 14th Floor",
        "Reflexology Park & Aroma Garden",
        "Designer Modular Kitchen Provision",
        "3-Tier Biometric Security System"
      ],
      floorPlans: [
        {
          name: "2 BHK Grand Royale",
          carpet: "785 sq. ft.",
          balcony: "75 sq. ft.",
          orientation: "East-West (Vastu Compliant)",
          rooms: "2 Bedrooms, 2 Bathrooms, Living, Dining, Utility Balcony",
          svgType: "2bhk"
        },
        {
          name: "3 BHK Imperial Suite",
          carpet: "1,120 sq. ft.",
          balcony: "115 sq. ft.",
          orientation: "North-East Scenic Facing",
          rooms: "3 Bedrooms, 3 Bathrooms, Foyer, Living, Dining, Terrace Deck",
          svgType: "3bhk"
        }
      ]
    },
    {
      id: "wellington",
      name: "Wellington",
      badge: "Lakefront Living",
      status: "14 Towers • Facing 7-Acre Central Lake",
      type: "Resort-Styled Waterfront Residences",
      configurations: ["2 BHK", "3 BHK", "3 BHK XL"],
      priceStarting: "₹ 86 Lacs*",
      priceNumber: 8600000,
      carpetArea: "820 - 1,420 sq. ft.",
      towers: "14 Signature Resort Towers (G + 24 Floors)",
      reraNo: "P52100054534, P52100019637, P52100045781",
      tagline: "Everyday Feels Like a Five-Star Lakefront Vacation",
      description: "Wellington redefines resort living with an expansive infinity lagoon pool, floating cabanas, private tropical gazebos, and sun-drenched balconies looking into the 7-acre central lake.",
      image: "assets/images/wellington-overview.jpg",
      masterLayout: "assets/images/Wellington-Master-Layout.jpg.bv.webp",
      accentColor: "#38bdf8",
      features: [
        "Direct Frontage to 7-Acre Central Lake Promenade",
        "Floating Cabana & Resort Infinity Pool",
        "Open-air Zen Pavilion & Jacuzzi Deck",
        "Electric Vehicle Fast-charging in All Bays",
        "Multipurpose Banquet Hall (150 capacity)",
        "Soundproof Work-From-Home Pods & Business Lounge"
      ],
      floorPlans: [
        {
          name: "2 BHK Urban Resort",
          carpet: "820 sq. ft.",
          balcony: "80 sq. ft.",
          orientation: "East Facing Morning Sunrise",
          rooms: "2 Beds, 2 Baths, Wide Living Room, Kitchen, Utility Deck",
          planImage: "assets/images/3-BHK-L.png",
          svgType: "2bhk"
        },
        {
          name: "3 BHK Lakefront Luxury",
          carpet: "1,120 sq. ft.",
          balcony: "125 sq. ft.",
          orientation: "Direct Lake Facing Panorama",
          rooms: "3 Beds, 3 Baths, Chef Kitchen, Lakeview Balcony",
          planImage: "assets/images/3-BHK-L.png",
          svgType: "3bhk"
        },
        {
          name: "3 BHK XL Presidential Grand",
          carpet: "1,380 sq. ft.",
          balcony: "175 sq. ft.",
          orientation: "Lake Facing Dual Balcony Vista",
          rooms: "3 Large Suites + Lounge, 3 Baths, Chef Kitchen, Lake Deck",
          planImage: "assets/images/3-BHK-XL.png",
          svgType: "3bhk"
        }
      ]
    },
    {
      id: "montreal",
      name: "Montreal",
      badge: "Duplex & Smart Tech",
      status: "Super Spacious Duplex Living",
      type: "Contemporary Smart Duplex Residences",
      configurations: ["2 BHK", "3 BHK", "4 BHK Duplex"],
      priceStarting: "₹ 74 Lacs*",
      priceNumber: 7400000,
      carpetArea: "740 - 1,850 sq. ft.",
      towers: "8 Smart Automation Towers",
      reraNo: "P52100077138, P52100021650, P52100053272",
      tagline: "Intelligent Living Powered by Modern Architecture",
      description: "Crafted for millennial families and tech professionals, Montreal integrates touch-panel home automation, smart energy-saving glass, aerodynamic cross-ventilation, and dedicated kid-safe play sectors.",
      image: "assets/images/montreal-hero-banner.webp",
      masterLayout: "assets/images/Montreal-Master-Layout-0.webp.bv.webp",
      accentColor: "#10b981",
      features: [
        "Smart Home Automation (Lights, Fans, AC Controls)",
        "Resort Infinity Lap Swimming Pool & Sun Loungers",
        "Toddlers Safe Soft-play Zone & Daycare",
        "Rooftop Solar Water Heating System",
        "Acoustic Glass Windows for Zero Noise",
        "Dedicated Pet Park with Agility Obstacles"
      ],
      floorPlans: [
        {
          name: "2 BHK Smart Tech",
          carpet: "740 sq. ft.",
          balcony: "65 sq. ft.",
          orientation: "North-East Morning Light",
          rooms: "2 Bedrooms, 2 Baths, Living, Kitchen with Dry Balcony",
          planImage: "assets/images/2-BHK-Montreal.jpg",
          svgType: "2bhk"
        },
        {
          name: "3 BHK Super Spacious Premier",
          carpet: "1,060 sq. ft.",
          balcony: "95 sq. ft.",
          orientation: "Corner Unit / Cross Ventilation",
          rooms: "3 Bedrooms, 3 Baths, Living, Dining, Dual Balconies",
          planImage: "assets/images/3BHK-montreal.jpg",
          svgType: "3bhk"
        },
        {
          name: "4 BHK Duplex Sky Villa",
          carpet: "1,850 sq. ft.",
          balcony: "210 sq. ft.",
          orientation: "Double-Height Panoramic Horizon",
          rooms: "4 Palatial Suites, Family Lounge, Private Sky Terrace",
          planImage: "assets/images/Cam_22Final.jpg",
          svgType: "4bhk"
        }
      ]
    },
    {
      id: "miami",
      name: "Miami",
      badge: "Waterfront Art Deco",
      status: "Under Construction • 9 High-Rise Towers",
      type: "2, 3 & 4.5 BHK Waterfront Residences",
      configurations: ["2 BHK", "3 BHK", "4.5 BHK Sky Penthouse"],
      priceStarting: "₹ 92 Lacs*",
      priceNumber: 9200000,
      carpetArea: "790 - 2,240 sq. ft.",
      towers: "9 Art Deco Waterfront Glass Towers",
      reraNo: "PR1260002600188 & P52100028741",
      tagline: "Sun, Water, and Miami-Inspired Splendor",
      description: "Directly overlooking the central waterfront lake, Miami brings vibrant South Beach vibes to Charholi. Characterized by curvaceous white facade lines, glass balustrades, palm-fringed avenues, and rooftop cocktail decks.",
      image: "assets/images/miami-desktop-banner.webp",
      masterLayout: "assets/images/Pride_Miami-Master-Layout_01Final.webp",
      accentColor: "#f59e0b",
      features: [
        "Direct Water Lake Promenade Access & Boardwalk",
        "Palm Beach Style Clubhouse & Infinity Pool Deck",
        "Rooftop Sky Barbeque & Stargazing Pods",
        "Olympic-length 50m Lap Swimming Pool",
        "State-of-the-art Cardio & CrossFit Studio",
        "9 Residential Towers set in lush landscaped greens"
      ],
      floorPlans: [
        {
          name: "2 BHK Contemporary",
          carpet: "790 sq. ft.",
          balcony: "85 sq. ft.",
          orientation: "Waterfront Garden View",
          rooms: "2 Bedrooms, 2 Baths, Open Living, Kitchen & Balcony",
          planImage: "assets/images/Miami-plan1.jpg",
          svgType: "2bhk"
        },
        {
          name: "2 BHK Grande with Deck",
          carpet: "880 sq. ft.",
          balcony: "110 sq. ft.",
          orientation: "Lake Breeze Facing",
          rooms: "2 Bedrooms, 2 Baths, Large Living Salon, Sundeck",
          planImage: "assets/images/Miami-plan2.jpg",
          svgType: "2bhk"
        },
        {
          name: "3 BHK Riviera Suite",
          carpet: "1,120 sq. ft.",
          balcony: "130 sq. ft.",
          orientation: "100% Cross Ventilation / Lake View",
          rooms: "3 Bedrooms, 3 Baths, Dining Foyer, Scenic Sundeck",
          planImage: "assets/images/Miami-plan3.jpg",
          svgType: "3bhk"
        },
        {
          name: "3 BHK Grande Lake Panorama",
          carpet: "1,320 sq. ft.",
          balcony: "165 sq. ft.",
          orientation: "Corner Lake Panorama",
          rooms: "3 Bedrooms + Powder Room, 3 Baths, Grand Saloon, Terrace Deck",
          planImage: "assets/images/Miami-plan4.jpg",
          svgType: "3bhk"
        },
        {
          name: "4.5 BHK Sky Villa Duplex",
          carpet: "2,100 sq. ft.",
          balcony: "320 sq. ft.",
          orientation: "Double-Height 360° Lake & Mountain Views",
          rooms: "4 En-suite Bedrooms, Media Lounge, Maid Quarters, Sky Terrace",
          planImage: "assets/images/Miami-plan5.jpg",
          svgType: "4bhk"
        }
      ]
    },
    {
      id: "nottinghill",
      name: "Notting Hill",
      badge: "Ultra Luxury",
      status: "Signature Limited Edition",
      type: "Opulent British Mansions & Duplex Penthouses",
      configurations: ["3 BHK", "4 BHK Duplex", "Bespoke Villas"],
      priceStarting: "₹ 1.68 Cr*",
      priceNumber: 16800000,
      carpetArea: "1,480 - 2,550 sq. ft.",
      towers: "Low-Density Private Estates (G + 11)",
      reraNo: "P52100015690",
      tagline: "Aristocratic Quintessence for Connoisseurs",
      description: "Exclusive to only 120 privileged families, Notting Hill offers double-height ceilings, private elevator access options, Italian marble flooring throughout, bespoke private plunge pools, and manicured English private lawns.",
      image: "assets/images/Cam_03Final-480x320.jpg",
      accentColor: "#a855f7",
      features: [
        "Double-height 22-foot Living Salons",
        "Private Plunge Pools in Duplex Variants",
        "Executive Driver Lounge & Valet Hub",
        "Temperature-controlled Wine Cellar Storage",
        "Bespoke Butler & Concierge on Call",
        "English Rose Garden & Sculpted Fountains"
      ],
      floorPlans: [
        {
          name: "3 BHK Manor Royale",
          carpet: "1,650 sq. ft.",
          balcony: "180 sq. ft.",
          orientation: "360-degree Garden Views",
          rooms: "3 Grand Master Suites, 4 Bathrooms, Servant Room, Grand Salon",
          svgType: "3bhk"
        },
        {
          name: "4 BHK Duplex Palace",
          carpet: "2,550 sq. ft.",
          balcony: "320 sq. ft.",
          orientation: "Top Floor Sky Panoramic",
          rooms: "4 Master En-suites, Private Plunge Pool, Maid Quarters, Family Den",
          svgType: "4bhk"
        }
      ]
    },
    {
      id: "longisland",
      name: "Long Island",
      badge: "Sky Villas",
      status: "Ready for Ultra-Elite Occupancy",
      type: "Sky Penthouses & Waterfront Mansions",
      configurations: ["3 BHK", "4 BHK Sky Villas"],
      priceStarting: "₹ 2.15 Cr*",
      priceNumber: 21500000,
      carpetArea: "1,850 - 3,200 sq. ft.",
      towers: "Iconic Triple Tower Landmark",
      reraNo: "P52100017892",
      tagline: "Living in the Clouds Above the 400-Acre Horizon",
      description: "Long Island represents the zenith of architectural ambition at Pride World City. Every residence offers unobstructed 270-degree horizons of Pune skyline and Sahyadri mountain ridges, bespoke private elevator vestibules, and lavish 40-foot continuous sky terraces.",
      image: "assets/images/pride-world-city-Bird-eye-view.jpeg.bv.webp",
      accentColor: "#fbbf24",
      features: [
        "Dedicated Private Lift Vestibule per Residence",
        "40-foot Continuous Panoramic Sky Balcony",
        "Floor-to-ceiling Acoustic Curtain Glass",
        "Sub-Zero & Wolf Kitchen Appliance Provisions",
        "Private Helipad Landing Privilege (Township)",
        "Club Royale Presidential Membership Included"
      ],
      floorPlans: [
        {
          name: "3 BHK Sky Suite",
          carpet: "1,850 sq. ft.",
          balcony: "210 sq. ft.",
          orientation: "Sahyadri Mountain Horizon",
          rooms: "3 En-suite Bedrooms, Powder Room, Staff Quarters, Sky Terrace",
          svgType: "3bhk"
        },
        {
          name: "4 BHK Presidential Sky Villa",
          carpet: "3,200 sq. ft.",
          balcony: "450 sq. ft.",
          orientation: "Panoramic 270° Corner Skyline",
          rooms: "4 Palatial Suites, Private Bar Lounge, Home Cinema Room, Chef Pantry, Maid Room",
          svgType: "4bhk"
        }
      ]
    },
    {
      id: "boston",
      name: "Boston Central",
      badge: "2X Advantage",
      status: "Two Balconies & Two Clubhouses",
      type: "2 BHK Homes with 2X Advantage & Smart Living",
      configurations: ["2 BHK"],
      priceStarting: "₹ 68 Lacs*",
      priceNumber: 6800000,
      carpetArea: "690 - 845 sq. ft.",
      towers: "High-Energy Urban Towers with 2 Mega Clubhouses",
      reraNo: "P52100078307 & P52100049648",
      tagline: "Double the Space, Double the Amenities, Double the Joy",
      description: "Boston Central delivers the exclusive 2X Advantage: Two Balconies providing abundant natural light, superior cross-ventilation, and private outdoor unwinding space, alongside Two Clubhouses doubling your access to fitness, recreation, and social leisure.",
      image: "assets/images/boston-desktop-homepage-banner.webp",
      masterLayout: "assets/images/Master-Layout-use-this.webp",
      accentColor: "#06b6d4",
      features: [
        "Two Private Balconies per Residence for 2X Ventilation",
        "Two Dedicated Clubhouses for Sports & Wellness",
        "Zero Commute to Co-working & High Street Retail",
        "Soundproof Podcast & Virtual Meeting Rooms",
        "Bouldering Climbing Wall & Rooftop Jogging Track",
        "High Rental Yield & Corporate Tenant Demand"
      ],
      floorPlans: [
        {
          name: "2 BHK S Boston (Two Balconies)",
          carpet: "715 sq. ft.",
          balcony: "75 sq. ft.",
          orientation: "East Facing Morning Sunrise",
          rooms: "2 Bedrooms, 2 Baths, Living Salon, Dual Private Balconies",
          planImage: "assets/images/2-BHK-S-Boston.jpg",
          svgType: "2bhk"
        },
        {
          name: "2 BHK L Boston (Dual Balconies & Suites)",
          carpet: "820 sq. ft.",
          balcony: "95 sq. ft.",
          orientation: "Cross-Ventilated Promenade View",
          rooms: "2 Master Suites, 2 Baths, Living-Dining, Kitchen, 2 Balconies",
          planImage: "assets/images/2-BHK-L-Boston.jpg",
          svgType: "2bhk"
        }
      ]
    },
    {
      id: "soho",
      name: "SoHo",
      badge: "Live-Work Suites",
      status: "2 Towers • Hybrid Work-Living",
      type: "2 & 2.5 BHK Live-Work Smart Residences",
      configurations: ["2 BHK", "2.5 BHK"],
      priceStarting: "₹ 58 Lacs*",
      priceNumber: 5800000,
      carpetArea: "610 - 810 sq. ft.",
      towers: "2 High-Tech Towers (Live, Work & Play)",
      reraNo: "P52100046548",
      tagline: "Designed for the New-Age Creator & Entrepreneur",
      description: "SoHo at Pride World City seamlessly blends work and personal life. Offering functional architectural elegance, dedicated co-working hubs, soundproof meeting rooms, and rooftop networking terraces.",
      image: "assets/images/boston-desktop-homepage-banner.webp",
      accentColor: "#8b5cf6",
      features: [
        "Plug-and-play Co-working Lounge with High-Speed Gigabit Fiber",
        "Soundproof Meeting Pods & Virtual Presentation Studios",
        "Rooftop Sunset Lounge & Coffee Bar",
        "24/7 Smart Access & Keyless Digital Entry",
        "Concierge Printing, Courier & Virtual Receptionist",
        "High Rental Yields & Dynamic Professional Community"
      ],
      floorPlans: [
        {
          name: "2 BHK SoHo Smart Work-Suite",
          carpet: "640 sq. ft.",
          balcony: "60 sq. ft.",
          orientation: "City Tech View",
          rooms: "Master Suite, Office-Bed Studio, Bath, Integrated Workspace Deck",
          planImage: "assets/images/2-BHK-S-Boston.jpg",
          svgType: "2bhk"
        },
        {
          name: "2.5 BHK SoHo Executive Loft",
          carpet: "790 sq. ft.",
          balcony: "80 sq. ft.",
          orientation: "High Street Skyline View",
          rooms: "2 Bedrooms, Dedicated Work Study, 2 Baths, Kitchen, Deck",
          planImage: "assets/images/2-BHK-L-Boston.jpg",
          svgType: "2bhk"
        }
      ]
    },
    {
      id: "brooklyn",
      name: "Brooklyn",
      badge: "Vibrant Community",
      status: "Delivered & Resale Available",
      type: "Modern 1 & 2 BHK Urban Homes",
      configurations: ["1 BHK", "2 BHK"],
      priceStarting: "₹ 54 Lacs*",
      priceNumber: 5400000,
      carpetArea: "560 - 780 sq. ft.",
      towers: "High-Rise Urban Towers",
      reraNo: "P52100000854",
      tagline: "Effortless City Living with Complete Township Convenience",
      description: "Pride Brooklyn offers meticulously planned 1 and 2 BHK residences ideal for young couples, tech professionals, and rental investors. Enjoy landscaped podiums, community clubhouse, children's park, and immediate connectivity to Dhanori and Pune Airport.",
      image: "assets/images/Scene_01_aerial-view.webp",
      accentColor: "#3b82f6",
      features: [
        "Thoughtful Space Optimization with Zero Wastage",
        "Community Clubhouse, Gym & Indoor Games",
        "High Rental Demand from Pune Airport & Viman Nagar Staff",
        "Children's Play Zone & Senior Citizen Pavilion",
        "24/7 Multi-Tier Gated Security",
        "Dedicated Power Backup & Water Conservation"
      ],
      floorPlans: [
        {
          name: "1 BHK Urban Compact",
          carpet: "560 sq. ft.",
          balcony: "45 sq. ft.",
          orientation: "Vastu Compliant East Facing",
          rooms: "Master Bedroom, Living Room, Kitchen, Utility Deck, Bath",
          svgType: "1bhk"
        },
        {
          name: "2 BHK Urban Comfort",
          carpet: "740 sq. ft.",
          balcony: "65 sq. ft.",
          orientation: "Cross-Ventilated Garden Facing",
          rooms: "2 Bedrooms, 2 Baths, Living-Dining, Kitchen, Balcony",
          svgType: "2bhk"
        }
      ]
    },
    {
      id: "manhattan",
      name: "Manhattan",
      badge: "Cosmopolitan Living",
      status: "Delivered & Resale Available",
      type: "Spacious 2 & 3 BHK Contemporary Residences",
      configurations: ["2 BHK", "3 BHK"],
      priceStarting: "₹ 68 Lacs*",
      priceNumber: 6800000,
      carpetArea: "730 - 1,080 sq. ft.",
      towers: "Sleek Contemporary Towers",
      reraNo: "P52100000854",
      tagline: "New York Architectural Flare in North Pune",
      description: "Pride Manhattan delivers vibrant cosmopolitan living characterized by expansive room layouts, wide panoramic balconies, designer entrance lobbies, and walking proximity to the Town Plaza high-street shopping boulevard.",
      image: "assets/images/wellington-overview.jpg",
      accentColor: "#ec4899",
      features: [
        "Spacious Living Rooms with Attached Sun Balconies",
        "Designer Club House with Fully Equipped Fitness Center",
        "Landscaped Central Greens & Jogging Loop",
        "Walking Distance to Pride High Street & Town Plaza",
        "Pre-approved by SBI, HDFC & ICICI Banks",
        "High Appreciation Corridor near Lohegaon-Charholi Axis"
      ],
      floorPlans: [
        {
          name: "2 BHK Cosmopolitan Suite",
          carpet: "745 sq. ft.",
          balcony: "70 sq. ft.",
          orientation: "East-West Sunrise Orientation",
          rooms: "2 Bedrooms, 2 Bathrooms, Living, Dining, Balcony, Kitchen",
          svgType: "2bhk"
        },
        {
          name: "3 BHK Grand Cosmopolitan",
          carpet: "1,080 sq. ft.",
          balcony: "105 sq. ft.",
          orientation: "Open Podium Horizon View",
          rooms: "3 Bedrooms, 3 Bathrooms, Foyer, Living-Dining, Dual Balconies",
          svgType: "3bhk"
        }
      ]
    },
    {
      id: "atlantic",
      name: "Atlantic",
      badge: "Scenic Horizon",
      status: "Under Construction / Modern Enclave",
      type: "Premium 2 & 3 BHK Scenic Residences",
      configurations: ["2 BHK", "3 BHK"],
      priceStarting: "₹ 72 Lacs*",
      priceNumber: 7200000,
      carpetArea: "740 - 1,120 sq. ft.",
      towers: "Modern High-Rise Towers",
      reraNo: "P52100021650",
      tagline: "Panoramic Breezes & Nature-Connected Living",
      description: "Pride Atlantic overlooks the peripheral green belts and botanical preserves of Pride World City. Thoughtfully crafted with aerodynamic cross-ventilation, generous daylighting, and direct access to the 10-acre sports arena.",
      image: "assets/images/montreal-hero-banner.webp",
      accentColor: "#0ea5e9",
      features: [
        "Unobstructed Valley and Green Belt Vistas",
        "Aerodynamic Layouts for Natural Year-Round Cooling",
        "Direct Access to Township 10-Acre Sports Arena",
        "Kids Splash Pool & Shaded Pergola Sit-outs",
        "EV Charging Bays & Rainwater Harvesting",
        "Proximity to Proposed Pune Ring Road & BRTS Route"
      ],
      floorPlans: [
        {
          name: "2 BHK Atlantic Breeze",
          carpet: "750 sq. ft.",
          balcony: "75 sq. ft.",
          orientation: "North-East Morning Light",
          rooms: "2 Bedrooms, 2 Baths, Living, Dining, Dry Terrace",
          svgType: "2bhk"
        },
        {
          name: "3 BHK Atlantic Horizon",
          carpet: "1,120 sq. ft.",
          balcony: "110 sq. ft.",
          orientation: "Scenic Valley Facing",
          rooms: "3 Bedrooms, 3 Baths, Living Salon, Sundeck, Kitchen",
          svgType: "3bhk"
        }
      ]
    }
  ],

  townshipZones: [
    {
      id: "zone-residential",
      name: "Residential Enclaves (11 Clusters)",
      area: "180+ Acres",
      icon: "fa-city",
      desc: "Distinct thematic master clusters from affordable luxury to sky villas, surrounded by tree-lined boulevards and pocket parks."
    },
    {
      id: "zone-lake",
      name: "7-Acre Central Lake & Waterfront Promenade",
      area: "7 Acres",
      icon: "fa-water",
      desc: "Serene waterfront with musical fountains, jogging loop, wooden boardwalks, floating gazebos, and sunset decks."
    },
    {
      id: "zone-sports",
      name: "10-Acre Multipurpose Sports Arena",
      area: "10 Acres",
      icon: "fa-volleyball",
      desc: "FIFA-grade football turf, full cricket pitch with floodlights, 6 tennis courts, squash arenas, Olympic running tracks, and skate park."
    },
    {
      id: "zone-clubroyale",
      name: "Club Royale (50,000 Sq.Ft Mega Clubhouse)",
      area: "50,000+ sq.ft",
      icon: "fa-chess-rook",
      desc: "Township flagship clubhouse with heated indoor pool, luxury spa, 4-lane bowling alley, banquets, screening cinema, and fine dining."
    },
    {
      id: "zone-education",
      name: "International Academic Campus (K-12)",
      area: "5 Acres",
      icon: "fa-graduation-cap",
      desc: "Affiliated CBSE & Cambridge curriculum school located safely inside township boundaries. Zero-street commute for children."
    },
    {
      id: "zone-highstreet",
      name: "CityWalk High Street & Town Center",
      area: "15 Acres",
      icon: "fa-bag-shopping",
      desc: "Alfresco open-air boulevard with high-end cafes, branded retail, daily hypermarket, banking branches, medical stores, and multiplex."
    },
    {
      id: "zone-tech",
      name: "Pride Tech District & Business Center",
      area: "20 Acres",
      icon: "fa-briefcase",
      desc: "State-of-the-art Grade-A commercial IT park offering walk-to-work opportunities for thousands of corporate professionals."
    },
    {
      id: "zone-health",
      name: "100-Bed Multi-Specialty Health Campus",
      area: "3 Acres",
      icon: "fa-hospital",
      desc: "Round-the-clock emergency care, diagnostic pathology, multispecialty clinics, and pharmacy right within the township gates."
    }
  ],

  amenitiesList: [
    { category: "Grand Leisure & Clubs", title: "Club Royale (50,000 sq.ft)", desc: "Pune's flagship residential clubhouse with indoor heated pool, 4-lane bowling alley, banquets, private 4K cinema, and fine dining." },
    { category: "Wellness & Aqua", title: "Olympic Lap & Lagoon Pools", desc: "Temperature-controlled swimming pool, children's splash pool, submerged aqua loungers, and private floating cabanas." },
    { category: "Sports & Athletics", title: "10-Acre Multipurpose Sports Arena", desc: "Full-size floodlit cricket pitch, FIFA-grade football turf, 6 synthetic tennis courts, and squash arena." },
    { category: "Sports & Athletics", title: "Pickleball & Badminton Academy", desc: "Dedicated high-spec pickleball courts, multi-sport courts, roller skating rink, and cycling veloway." },
    { category: "Nature & Ecology", title: "7-Acre Central Lake & Promenade", desc: "2.4 km continuous wooden walking boardwalk, musical fountain, sunset observation pier, and aquatic flora." },
    { category: "Nature & Ecology", title: "38-Acre Green Spine & Eco-Forest", desc: "Over 70% open green corridors, botanical butterfly park, native tree canopy, and organic community farming plots." },
    { category: "Convenience & High Street", title: "CityWalk Retail & Town Plaza", desc: "Alfresco open-air European-style high street with branded cafes, gourmet patisseries, salons, ATMs, and hypermarket." },
    { category: "Convenience & Lifestyle", title: "Multiplex Cinema & Gaming Hub", desc: "Entertainment zone with 4K Dolby Atmos cinema screens, VR simulation arcade, and youth lounge." },
    { category: "Education & Campus", title: "K-12 Cambridge & CBSE School", desc: "Affiliated international school located safely within the township perimeter, ensuring zero-street commute for kids." },
    { category: "Healthcare & Wellness", title: "100-Bed Multi-Specialty Hospital", desc: "24/7 emergency trauma care, diagnostic pathology lab, multi-specialty clinics, and dedicated ambulance fleet." },
    { category: "Safety & Security", title: "5-Tier High-Tech Security Shield", desc: "Centralized command & control center, 24/7 CCTV smart analytics, RFID vehicular access, and panic alarm beacons." },
    { category: "Pet & Family Parks", title: "Bark Park & Pet Agility Trail", desc: "Dedicated fenced pet walking lawn with obstacle courses, pet wash stations, and seating pavilions for owners." },
    { category: "Active Seniors", title: "Reflexology & Senior Citizen Plaza", desc: "Peaceful landscaped acupressure pebble paths, shaded gazebos, yoga pavilion, and laughing clubs." },
    { category: "Work & Commerce", title: "Pride Tech District & Co-Work", desc: "Grade-A enterprise tech hub with modern collaborative co-working pods, meeting suites, and gigabit fiber internet." },
    { category: "Green Mobility", title: "Electric Buggies & EV Charging", desc: "Complimentary on-demand electric golf carts for internal movement and EV fast-charging stations across all sectors." },
    { category: "Smart Infrastructure", title: "Eco-Township Sustainability Hub", desc: "100% STP treated water for landscaping, extensive rainwater harvesting wells, and rooftop solar power grid." }
  ],

  connectivity: [
    { destination: "Pune International Airport (Lohegaon)", distance: "4.8 Km", time: "10 Mins", type: "Air Transit" },
    { destination: "D.Y. Patil Knowledge City (Colleges & Schools)", distance: "1.2 Km", time: "3 Mins", type: "Education" },
    { destination: "Phoenix Marketcity Mall (Viman Nagar)", distance: "8.5 Km", time: "15 Mins", type: "Shopping & Dining" },
    { destination: "EON Free Zone / WTC (Kharadi IT Park)", distance: "11.2 Km", time: "18 Mins", type: "IT & Tech Hub" },
    { destination: "Commerzone & Panchshil Tech Park (Yerwada)", distance: "9.2 Km", time: "16 Mins", type: "IT & Tech Hub" },
    { destination: "Kalyani Nagar / Koregaon Park", distance: "12.5 Km", time: "20 Mins", type: "Lifestyle & Nightlife" },
    { destination: "Pune Railway Station", distance: "14.0 Km", time: "25 Mins", type: "Rail Transit" },
    { destination: "Upcoming PMRDA Ring Road & Metro", distance: "0.5 Km", time: "2 Mins", type: "Future Corridor" }
  ],

  testimonials: [
    {
      name: "Rohit & Ananya Deshmukh",
      cluster: "Kingsbury Residents (Living since 2022)",
      role: "VP Engineering at Kharadi IT Park",
      quote: "Moving to Pride World City was the single best decision for our family. My office in Kharadi is barely 18 minutes away, and my children walk to their school within the township without stepping outside the security perimeter. The green lung spaces here are unmatched in Pune.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Capt. Vikram & Shalini Malhotra",
      cluster: "Long Island Sky Villa Owners",
      role: "Commercial Airline Pilot",
      quote: "As a pilot operating out of Pune International Airport, being 10 minutes away from the terminal while enjoying 360-degree views of the Sahyadri mountains from our 24th floor sky villa is pure serenity. Club Royale rivals any 5-star resort in Goa.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Dr. Priya Kulkarni & Rajesh Kulkarni",
      cluster: "Wellington Phase Resident",
      role: "Chief Medical Officer & FinTech Founder",
      quote: "The sheer scale of 400 acres means you have space to breathe. Evening walks along the central lake, weekend tennis matches at the sports arena, and the high-street retail make it a completely independent city within a city.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Capt. Atul Sinha",
      cluster: "Montreal Smart Duplex Owner",
      role: "Aviation Captain & NRI Investor",
      quote: "We were looking for something secluded, peaceful and yet providing world-class amenities. We found that Pride World City is the absolute benchmark of integrated master communities in Maharashtra.",
      avatar: "assets/images/Atul-Sinha.webp"
    },
    {
      name: "Pushpraj & Family",
      cluster: "Valencia Sun-Side Resident",
      role: "Senior Director, Global Tech",
      quote: "Valencia's 100% East-West orientation means our apartment is bathed in natural morning light and cooling cross-breeze. The private forest trail and open green belts give our kids an active, healthy childhood.",
      avatar: "assets/images/Pushpraj.webp"
    },
    {
      name: "Rajesh K.",
      cluster: "Miami Lakefront Resident",
      role: "FinTech Founder & Angel Investor",
      quote: "The master planning at Pride World City is exceptional. Stepping out to the 7-acre lake promenade, having pickleball courts and sports arenas within walking distance elevates day-to-day living into an everyday vacation.",
      avatar: "assets/images/Rajesh.webp"
    }
  ],

  faqs: [
    {
      q: "What is Pride World City Pune?",
      a: "Pride World City is a premier 400-acre integrated mega township developed by Pride Group in Charholi Budruk, North Pune. Designed on global urban planning principles, it encompasses over 5 million sq. ft. of completed developments and 8+ million sq. ft. under active construction, accommodating more than 10,000 families with residential clusters, commercial IT parks, high-street retail, international education, and healthcare infrastructure."
    },
    {
      q: "Where is Pride World City located and how is the connectivity?",
      a: "Pride World City is strategically located at Charholi Budruk, adjacent to D.Y. Patil Knowledge City in North Pune. It borders Lohegaon and Dhanori, situated just 4.8 km (10 minutes) from Pune International Airport, 11 km from the Kharadi IT corridor (EON IT Park and World Trade Center), and minutes from Viman Nagar, Kalyani Nagar, and Vishrantwadi, with direct connectivity via the upcoming Pune Ring Road and BRTS bus corridors."
    },
    {
      q: "Who is the master developer of Pride World City?",
      a: "The master developer is Pride Group (Pride Developers Pune), a nationally acclaimed real estate pioneer with a 28+ year legacy of excellence. Led by Managing Director Arvind Jain, Pride Group has delivered landmark residential townships, IT business parks, and hospitality ventures across Pune, Mumbai, and Bangalore."
    },
    {
      q: "How many acres is Pride World City township and what is its scale?",
      a: "Pride World City spans approximately 400 contiguous acres. It is recognized as one of the largest integrated, master-planned townships in Maharashtra, featuring 70% open green corridors, an authentic 7-acre central lake promenade, and a 10-acre sports arena."
    },
    {
      q: "What are the residential projects inside Pride World City?",
      a: "The residential portfolio includes 11 signature enclaves: Valencia (New Launch 2 & 3 BHK sun-side homes), Miami (luxury waterfront 2, 3 & 4.5 BHK), Boston Central (smart 2 BHK homes with 2X advantage), Montreal (smart tech 2, 3 BHK & 4 BHK duplex residences), Wellington (resort-style 2 & 3 BHK facing the 7-acre lake), Kingsbury (ready-to-move royal 2 & 3 BHK), Brooklyn (urban 1 & 2 BHK), Manhattan (spacious 2 & 3 BHK), Atlantic (scenic high-rise apartments), Long Island (ultra-luxury sky villas), and SoHo (hybrid live-work suites)."
    },
    {
      q: "What is the price of 2 BHK and 3 BHK flats in Pride World City?",
      a: "Starting prices vary by enclave: 2 BHK flats start from ₹54 Lacs* in Brooklyn/SoHo, ₹68 Lacs* in Boston Central, ₹74 Lacs* in Montreal, ₹78 Lacs* in Kingsbury, ₹86 Lacs* in Wellington, ₹92 Lacs* in Miami, and ₹92.49 Lacs* (All Inclusive) in Valencia. Spacious 3 BHK residences start from ₹1.05 Cr* in Wellington and Montreal, and ₹1.23 Cr* in Valencia. All-inclusive cost sheets and flexible construction-linked payment plans are available upon request."
    },
    {
      q: "What is Pride Miami and what are its configurations and price?",
      a: "Pride Miami is an art-deco inspired waterfront residential cluster comprising 9 high-rise glass towers set on the edge of the 7-acre central lake. Miami offers 2 BHK, 3 BHK, and palatial 4.5 BHK sky residences (carpet areas from 790 to 2,240 sq. ft.) starting from ₹92 Lacs* up to ₹2.45 Cr*. MahaRERA Registration: PR1260002600188 & P52100028741."
    },
    {
      q: "What is Boston Central and what is the 2X Advantage?",
      a: "Boston Central is an energetic urban cluster featuring the proprietary 2X Advantage: Two private sundeck balconies per apartment ensuring double the cross-ventilation and natural daylight, coupled with Two independent Clubhouses catering to active sports and serene social wellness. Configured as smart 2 BHK homes from ₹68 Lacs*. MahaRERA: P52100078307 & P52100049648."
    },
    {
      q: "What is Pride Montreal and what are the duplex options?",
      a: "Pride Montreal combines European contemporary architecture with smart home tech automation. In addition to 2 & 3 BHK apartments, Montreal features exclusive 4 BHK Duplex Residences (1,850 sq. ft. carpet) with double-height ceilings, private family lounges, and open sky terraces, priced from ₹1.65 Cr*. MahaRERA: P52100077138 & P52100021650."
    },
    {
      q: "What is Pride Wellington 3 BHK price and amenities?",
      a: "Pride Wellington offers resort-style waterfront residences across 14 towers overlooking the central lake. Premium 3 BHK lake-facing apartments start from ₹1.12 Cr* (carpet area 1,040 - 1,420 sq. ft.). Amenities include an expansive 7-acre landscaped podium, infinity lagoon pool, floating cabanas, private tropical gazebos, and acoustic work-from-home pods. MahaRERA: P52100054534 & P52100019637."
    },
    {
      q: "What is the difference between Pride Miami and Pride Montreal?",
      a: "While both represent luxury developments, Miami is a South Beach-inspired waterfront cluster focusing on expansive lakeside balconies, 4.5 BHK large-format sky suites, and panoramic water views. Montreal is a tech-forward smart enclave offering voice/app-enabled home automation and 4 BHK duplex residences with double-height architectural volumes."
    },
    {
      q: "What is the carpet area range of Pride World City apartments?",
      a: "Carpet areas are thoughtfully engineered across configurations: 1 BHK (560 - 620 sq. ft.), 2 BHK (690 - 880 sq. ft.), 3 BHK (1,020 - 1,420 sq. ft.), 4 BHK & 4.5 BHK (1,780 - 2,240 sq. ft.), and presidential duplex sky villas at Long Island reaching up to 3,500+ sq. ft."
    },
    {
      q: "What social infrastructure and amenities exist inside Pride World City?",
      a: "The township operates as a complete self-sustaining ecosystem featuring: 50,000 sq. ft. Club Royale / Club Charholi, 7-acre central natural lake with boardwalks, 10-acre multi-sport arena (cricket ground, football turf, tennis, badminton, and pickleball courts), Global Indian International School (GIIS), planned 100-bed multispeciality hospital, Town Plaza shopping promenade, BRTS rapid transit hub, senior citizen wellness zones, and 5-star business hotel."
    },
    {
      q: "Is there an operational school inside Pride World City?",
      a: "Yes, the prestigious Global Indian International School (GIIS Charholi) is operational right within the township boundaries. Residents receive priority admission privileges for their children, offering Cambridge and CBSE curricula and eliminating stressful daily traffic commutes."
    },
    {
      q: "Is there a commercial IT business park inside Pride World City?",
      a: "Yes, Pride World City incorporates Pride Tech Park (offering Grade-A corporate office spaces and IT facilities) and SoHo commercial business hubs, enabling walk-to-work culture for software engineers, entrepreneurs, and consulting professionals in North Pune."
    },
    {
      q: "How far is Pride World City from Pune Airport and Kharadi EON IT Park?",
      a: "Pride World City is only 4.8 km (approx. 10 minutes) from Pune International Airport via Lohegaon-Airport Road. Kharadi EON Free Zone, World Trade Center (WTC), and Magarpatta are reached within 18 to 22 minutes via the direct 8-lane corridor, making it the preferred residential township for IT and corporate professionals."
    },
    {
      q: "Is Pride World City a good investment for capital appreciation and rental yield?",
      a: "Yes, Pride World City is one of North Pune's highest-performing investment destinations. Driven by the upcoming Pune Ring Road, Pune Airport terminal expansion, and adjacent D.Y. Patil Knowledge City student-faculty population, rental yields average 4.5% - 6% annually for 1 & 2 BHK units, with proven capital appreciation exceeding 42% over the last 5 years."
    },
    {
      q: "Are ready possession and resale flats available in Pride World City?",
      a: "Yes, fully delivered clusters like Kingsbury, Brooklyn, and Manhattan have active resale and rental inventory for immediate possession, ranging from semi-furnished 1 BHKs to luxury furnished 3 BHK units. New launch and under-construction inventory is available in Valencia, Miami, Boston Central, and Wellington with phased possessions from 2026 to 2028."
    },
    {
      q: "Is Pride World City MahaRERA registered and what are the certificates?",
      a: "Yes, 100% of Pride World City enclaves are officially registered under MahaRERA: Valencia (P52100052309), Miami (PR1260002600188), Boston (P52100078307), Montreal (P52100077138), Wellington (P52100054534), Kingsbury (P52100000854), SoHo (P52100029810), and Long Island (P52100017892). Verification can be validated on maharera.mahaonline.gov.in."
    },
    {
      q: "Which banks offer pre-approved home loans for Pride World City?",
      a: "All premier public and private banks have pre-sanctioned Pride World City projects, including State Bank of India (SBI), HDFC Bank, ICICI Bank, Axis Bank, Bank of Baroda, and Punjab National Bank. Competitive interest rates, transparent zero-hidden-fee processing, and maximum LTV (up to 80-90%) are available."
    },
    {
      q: "How does Pride World City compare with Ganga New Town, Life Republic, and other Pune townships?",
      a: "Pride World City offers three unmatched competitive advantages: 1) Proximity to Pune Airport (10 mins vs 45+ mins from Life Republic Hinjawadi), 2) Exceptional 7-acre natural lake and 50,000 sq. ft. Club Royale infrastructure already delivered on-site, and 3) Superior multi-modal connectivity to both East Pune (Kharadi/Viman Nagar) and PCMC automotive hubs (Bhosari/Chakan)."
    }
  ],

  leadership: {
    leaderName: "Mr. Arvind Jain",
    designation: "Managing Director, Pride Group",
    image: "assets/images/Arvind-Sir-Image-No-Background-1084x1536-2.png",
    addressOfYesLogo: "assets/images/pride-world-city-address-of-yes-logo.jpg",
    quote: "Our vision for Pride World City was never to just build towers—it was to create a self-sustaining world. An integrated metropolis where our children breathe pristine air, where families live without traffic congestion, and where luxury is measured in quality time, wellness, and peace of mind.",
    tagline: "Pride World City — The Address of Yes",
    pillars: [
      { text: "Say YES to 70% Open Green Corridors", icon: "fa-leaf" },
      { text: "Say YES to 10 Mins to Pune Airport", icon: "fa-plane-departure" },
      { text: "Say YES to K-12 Cambridge School at Doorstep", icon: "fa-graduation-cap" },
      { text: "Say YES to 50,000 Sq.Ft Club Royale", icon: "fa-champagne-glasses" }
    ]
  },

  civicInfrastructure: [
    {
      id: "brts",
      title: "BRTS & Metro Transit Hub",
      icon: "assets/images/BRTS-Bus-Stop.webp",
      desc: "Direct rapid transit hub connecting Pride World City directly across Pune, Kharadi, and PCMC corridors.",
      status: "Operational & Proposed Metro"
    },
    {
      id: "hotel",
      title: "5-Star Luxury Business Hotel",
      icon: "assets/images/5-Star-Hotel.webp",
      desc: "World-class hospitality catering to international travelers, corporate executives, and social galas.",
      status: "Upcoming Master Zone"
    },
    {
      id: "hospital",
      title: "100-Bed Multi-Speciality Hospital",
      icon: "assets/images/Multispeciality-Hospital.webp",
      desc: "State-of-the-art diagnostic facilities, 24/7 trauma emergency care, and specialty clinics right inside the gates.",
      status: "Healthcare District"
    },
    {
      id: "techpark",
      title: "Pride Business & Tech Park",
      icon: "assets/images/Business-and-Tech-Park.webp",
      desc: "Grade-A IT & corporate towers offering walk-to-work careers for thousands of knowledge professionals.",
      status: "Commercial District"
    },
    {
      id: "townplaza",
      title: "Town Plaza & High Street",
      icon: "assets/images/Town-Plaza.webp",
      desc: "Vibrant retail boulevard featuring alfresco European cafes, boutique fashion, hypermarkets, and banks.",
      status: "Completed & Active"
    },
    {
      id: "multiplex",
      title: "Mall & Multiplex Arena",
      icon: "assets/images/Mall-Multiplex.webp",
      desc: "Multi-screen 4K cinema experience with Dolby Atmos sound, family entertainment arcades, and food courts.",
      status: "Township Entertainment"
    },
    {
      id: "clubcharholi",
      title: "Club Charholi Mega Center",
      icon: "assets/images/Club-Charholi.webp",
      desc: "Over 50,000 sq.ft of recreation including Olympic lap pools, bowling alley, badminton, and private banquet salons.",
      status: "Delivered & Resident Active"
    },
    {
      id: "school",
      title: "Cambridge International School",
      icon: "assets/images/School.webp",
      desc: "Safe zero-commute K-12 campus nurturing future leaders inside the township's security shield.",
      status: "Academic Campus"
    },
    {
      id: "senior",
      title: "Senior Living & Wellness",
      icon: "assets/images/Senior-Citizen-Living.webp",
      desc: "Dedicated tranquil enclaves with reflexology pathways, specialized geriatric care, and herbal gardens.",
      status: "Holistic Wellness"
    },
    {
      id: "learning",
      title: "Sports & Learning Academy",
      icon: "assets/images/Learning-Academy.webp",
      desc: "Professional coaching academy for cricket, soccer, tennis, swimming, and performing arts.",
      status: "Youth Sports"
    },
    {
      id: "fuel",
      title: "EV Fast-Charging & Fuel Hub",
      icon: "assets/images/Fuel-Station.webp",
      desc: "Integrated clean energy supercharging stations and automotive convenience within the perimeter.",
      status: "Green Mobility"
    },
    {
      id: "fire",
      title: "Civic Safety & Fire Station",
      icon: "assets/images/Fire-Station.webp",
      desc: "Dedicated on-premise emergency response center ensuring the highest urban safety benchmarks.",
      status: "Civic Security"
    }
  ],

  galleryItems: [
    {
      id: "g1",
      title: "400-Acre Masterplan Bird's Eye Horizon",
      category: "masterplan",
      categoryLabel: "Township Masterplan",
      image: "assets/images/pride-world-city-Bird-eye-view.jpeg.bv.webp",
      desc: "Expansive aerial perspective showcasing the 400-acre masterplan in Charholi, Pune."
    },
    {
      id: "g2",
      title: "Wellington Resort Living Overview",
      category: "clusters",
      categoryLabel: "Residences & Clusters",
      image: "assets/images/wellington-overview.jpg",
      desc: "Resort-styled luxury wings with infinity lagoon pools and central lake vistas."
    },
    {
      id: "g3",
      title: "Montreal Modern Smart Homes",
      category: "clusters",
      categoryLabel: "Residences & Clusters",
      image: "assets/images/montreal-hero-banner.webp",
      desc: "Futuristic home automation with landscaped gardens and pedestrian avenues."
    },
    {
      id: "g4",
      title: "Valencia Spanish Sunset Residences",
      category: "clusters",
      categoryLabel: "Residences & Clusters",
      image: "assets/images/Valencia-Homes-Sunset-Launch-Banner.webp",
      desc: "Spanish-themed architectural enclave capturing warm Sahyadri sunset hues."
    },
    {
      id: "g5",
      title: "Miami Waterfront Lake Promenade",
      category: "clusters",
      categoryLabel: "Residences & Clusters",
      image: "assets/images/miami-desktop-banner.webp",
      desc: "Art Deco inspired waterfront towers directly overlooking the 7-acre lake."
    },
    {
      id: "g6",
      title: "Boston Central Cosmopolitan Suites",
      category: "clusters",
      categoryLabel: "Residences & Clusters",
      image: "assets/images/boston-desktop-homepage-banner.webp",
      desc: "Urban live-work studios and high-yield boutique residences along High Street."
    },
    {
      id: "g7",
      title: "Completed Club Charholi & Sports Center",
      category: "amenities",
      categoryLabel: "Club Royale & Sports",
      image: "assets/images/Completed_Club_charholi.webp",
      desc: "Flagship 50,000 sq.ft clubhouse with multi-tier pools and sports courts."
    },
    {
      id: "g8",
      title: "Montreal Infinity Swimming Pool",
      category: "amenities",
      categoryLabel: "Club Royale & Sports",
      image: "assets/images/montreal-swimming-pool.webp",
      desc: "Resort-grade infinity swimming pool with sun lounges and safe splash zones."
    },
    {
      id: "g9",
      title: "Town Plaza & High Street Promenade",
      category: "amenities",
      categoryLabel: "Club Royale & Sports",
      image: "assets/images/Completed_townplaza.webp",
      desc: "Vibrant high-street retail destination with alfresco dining and lifestyle stores."
    },
    {
      id: "g10",
      title: "Kids Experiential Play & Adventure Park",
      category: "amenities",
      categoryLabel: "Club Royale & Sports",
      image: "assets/images/kids-play-area-montreal.webp",
      desc: "Safe rubber-matted play sector with climbing obstacles and sensory equipment."
    },
    {
      id: "g11",
      title: "Designer Modular Chef's Kitchen (Enscape 3D)",
      category: "interiors",
      categoryLabel: "Interiors & 3D Enscape",
      image: "assets/images/Enscape_2024-10-16-15-20-22_kitchen-1-1.webp",
      desc: "Ultra-modern quartz countertop kitchen with ambient under-cabinet LED illumination."
    },
    {
      id: "g12",
      title: "Palatial Guest Master Bedroom (Enscape 3D)",
      category: "interiors",
      categoryLabel: "Interiors & 3D Enscape",
      image: "assets/images/Enscape_2024-10-16-16-46-05_GUEST-1-1.webp",
      desc: "Floor-to-ceiling panoramic glass windows with hardwood flooring and walk-in wardrobe."
    },
    {
      id: "g13",
      title: "Double-Height Grand Living Salon (Enscape 3D)",
      category: "interiors",
      categoryLabel: "Interiors & 3D Enscape",
      image: "assets/images/Enscape_2024-11-25-19-03-09_Enscape-scene-1-1.webp",
      desc: "22-foot high ceiling living room with private sundeck and acoustic glazing."
    },
    {
      id: "g14",
      title: "Sky Lounge & Cocktail Sundeck (Enscape 3D)",
      category: "interiors",
      categoryLabel: "Interiors & 3D Enscape",
      image: "assets/images/Enscape_2024-11-25-19-03-09_Enscape-scene-18-1.webp",
      desc: "Private 40-foot terrace with breathtaking valley and skyline vistas."
    },
    {
      id: "g15",
      title: "Valencia Master Layout & Connectivity Plan",
      category: "masterplan",
      categoryLabel: "Township Masterplan",
      image: "assets/images/11-original.png",
      desc: "Official master layout diagram of Valencia's 5.9-acre enclave within Pride World City."
    },
    {
      id: "g16",
      title: "Valencia Grand Evening Gateway",
      category: "clusters",
      categoryLabel: "Residences & Clusters",
      image: "assets/images/19-entrance-evening-838x386.jpg",
      desc: "Architectural illuminated entrance boulevard welcoming residents to Valencia."
    },
    {
      id: "g17",
      title: "Miami 9-Tower Master Layout & Lake Promenade",
      category: "masterplan",
      categoryLabel: "Township Masterplan",
      image: "assets/images/Pride_Miami-Master-Layout_01Final.webp",
      desc: "Official master layout of Miami enclave featuring 9 residential towers and central amenity parklands."
    },
    {
      id: "g18",
      title: "Wellington Lakefront Master Layout",
      category: "masterplan",
      categoryLabel: "Township Masterplan",
      image: "assets/images/Wellington-Master-Layout.jpg.bv.webp",
      desc: "Wellington master site plan featuring 14 towers directly facing the 7-acre lake."
    },
    {
      id: "g19",
      title: "Montreal Duplex Smart Master Layout",
      category: "masterplan",
      categoryLabel: "Township Masterplan",
      image: "assets/images/Montreal-Master-Layout-0.webp.bv.webp",
      desc: "Montreal master layout with smart automated towers and children's eco-park."
    },
    {
      id: "g20",
      title: "Boston Central 2X Advantage Master Layout",
      category: "masterplan",
      categoryLabel: "Township Masterplan",
      image: "assets/images/Master-Layout-use-this.webp",
      desc: "Boston Central master layout blueprint with dual clubhouses and High Street access."
    }
  ],

  valenciaDetail: {
    title: "Valencia by Pride World City",
    tagline: "Hola to the brighter side of life",
    subtitle: "A NEW CHAPTER AT PRIDE WORLD CITY",
    logo: "assets/images/Pride-World-City-Valencia-Logo.webp",
    banner: "assets/images/Twilight-Valencia-Apartment-Launch-Banner.webp.bv.webp",
    entrance: "assets/images/19-entrance-evening-838x386.jpg",
    masterLayout: "assets/images/11-original.png",
    overview: "At Valencia, the sun becomes part of everyday life. The East-West open apartments welcome sunlight from morning to evening, creating brighter living spaces and a lifestyle that stays connected to the outdoors. It is a home designed for an All Day Sun, All-Side Sunny Side across 5.9 acres.",
    reraNo: "P52100052309",
    pillars: [
      {
        icon: "assets/images/icon-acres-towers-98x100.png",
        title: "5.9 Acres. 5 Towers.",
        desc: "Low-density planned master enclave with G+28 floor modern towers."
      },
      {
        icon: "assets/images/icon-east-west-100x102.png",
        title: "East-West Facing Towers*",
        desc: "All-day natural sun-side living with morning sunrise & evening golden hour."
      },
      {
        icon: "assets/images/icon-homes-106x100.png",
        title: "2 & 3 BHK Homes",
        desc: "Thoughtfully planned living spaces with expansive private sun-decks."
      },
      {
        icon: "assets/images/icon-amenities-100x96.png",
        title: "20+ Premium Amenities",
        desc: "World-class recreation, fitness, kids' zones, and private forest trails."
      }
    ],
    pricing: [
      {
        typology: "2 BHK Sun-Side Home",
        carpet: "755 - 795 sq. ft.",
        price: "₹ 92.49 L* Onwards (All Inclusive)",
        planImage: "assets/images/2-BHK-S-Boston.jpg.bv.webp",
        highlights: ["East-West Open Layout", "Cross-Ventilation", "Private Sundeck Balcony", "Zero Space Wastage"]
      },
      {
        typology: "3 BHK Grand Sun-Side Suite",
        carpet: "1,045 - 1,180 sq. ft.",
        price: "₹ 1.23 Cr* Onwards (All Inclusive)",
        planImage: "assets/images/2-BHK-L-Boston.jpg.bv.webp",
        highlights: ["Master Suite with Dressing Area", "Dual Balconies", "Scenic Lake & Horizon Views", "Italian Marble Finish Option"]
      }
    ],
    amenities: [
      {
        category: "Swimming pool & Kids Pool",
        tagline: "Hola to making a splash.",
        desc: "A resort lap pool for you, and a safe splash pool for the little ones with sun lounger deck.",
        image: "assets/images/05-original.webp"
      },
      {
        category: "Sports & Fitness",
        tagline: "Hola to staying active.",
        desc: "Jogging Track, Open Gym, Multipurpose Court, and dedicated Pickleball Court.",
        image: "assets/images/06-original.webp"
      },
      {
        category: "Children’s Spaces",
        tagline: "Hola to childhood, well spent.",
        desc: "Kids Play Area with modern adventure equipment, Sandpit, Creche, and soft-play zone.",
        image: "assets/images/07-original.webp"
      },
      {
        category: "Family & Social Spaces",
        tagline: "Hola to celebrations and get-togethers.",
        desc: "Multipurpose Banquet Hall, Party Lawn, Open-Air Amphitheater, and community gazebo.",
        image: "assets/images/08-original.webp"
      },
      {
        category: "Forest Trail & Biodiversity Park",
        tagline: "Hola to nature trails and clean air.",
        desc: "Forest Trail, Biodiversity Eco-Park, Butterfly Garden, and Fruit Orchard inside the enclave.",
        image: "assets/images/09-original.webp"
      },
      {
        category: "Pet Park & Senior Citizen Plaza",
        tagline: "Hola to spaces for all generations.",
        desc: "Dedicated Pet Walking Park with agility track, reflexology path, and serene Senior Citizen Plaza.",
        image: "assets/images/pet-park-and-senior-citizen-area-pwc.webp.bv.webp"
      }
    ],
    testimonials: [
      {
        name: "Capt. Atul Sinha",
        role: "Resident / Aviation Professional",
        quote: "We were looking for something secluded, peaceful and yet providing modern amenities. We have found that Pride World City is one of the best choices in Pune.",
        image: "assets/images/Atul-Sinha.webp",
        stars: 5
      },
      {
        name: "Pushpraj & Family",
        role: "Corporate Executive",
        quote: "Valencia's East-West orientation means our home is filled with natural breeze and light all day long. Walking through the forest trail every morning is therapeutic.",
        image: "assets/images/Pushpraj.webp",
        stars: 5
      },
      {
        name: "Rajesh K.",
        role: "FinTech Founder",
        quote: "The master layout planning at Valencia is top tier. Having the sports arena, pickleball courts, and clubhouse right within walking distance makes everyday effortless.",
        image: "assets/images/Rajesh.webp",
        stars: 5
      }
    ]
  },

  puneMarketTrends: {
    city: "Pune",
    updatedDate: "November 2026",
    growthDriver: "PMRDA Ring Road, Pune Airport Terminal 2 & Kharadi Tech Corridor",
    averageAppreciation5Yr: "42.8%",
    microMarketRates: [
      {
        locality: "Charholi Budruk (Pride World City)",
        region: "North Pune",
        avgRateSqFt: "₹ 6,800 - ₹ 8,200",
        rentalYield: "4.8% - 6.0%",
        connectivityHighlights: "10 mins to Airport, 18 mins to Kharadi IT Park, PMRDA Ring Road 1.8 km",
        verdict: "High Capital Growth & Superior Value Arbitrage"
      },
      {
        locality: "Dhanori & Lohegaon",
        region: "North-East Pune",
        avgRateSqFt: "₹ 6,200 - ₹ 7,800",
        rentalYield: "3.8% - 4.5%",
        connectivityHighlights: "Adjacent to Airport, narrow internal roads, standalone buildings",
        verdict: "Moderate appreciation, higher density"
      },
      {
        locality: "Viman Nagar",
        region: "East Pune",
        avgRateSqFt: "₹ 11,500 - ₹ 16,500",
        rentalYield: "3.2% - 3.8%",
        connectivityHighlights: "Prime lifestyle retail, Phoenix Mall, mature saturated market",
        verdict: "High capital entry barrier, low rental yield"
      },
      {
        locality: "Kharadi (EON Free Zone / WTC)",
        region: "East Pune",
        avgRateSqFt: "₹ 8,900 - ₹ 13,200",
        rentalYield: "3.5% - 4.2%",
        connectivityHighlights: "Leading IT hub, heavy peak-hour traffic choke points",
        verdict: "High demand, expensive ticket size"
      },
      {
        locality: "Hinjawadi IT Park",
        region: "West Pune",
        avgRateSqFt: "₹ 6,800 - ₹ 9,500",
        rentalYield: "3.6% - 4.4%",
        connectivityHighlights: "60+ mins from Airport, severe peak congestion on Hinjawadi flyover",
        verdict: "Tech-focused, distant from Airport & East IT corridors"
      },
      {
        locality: "Baner & Balewadi",
        region: "North-West Pune",
        avgRateSqFt: "₹ 9,800 - ₹ 14,500",
        rentalYield: "3.1% - 3.7%",
        connectivityHighlights: "High-end commercial & residential, highly saturated land parcels",
        verdict: "Premium pricing, limited large-scale township infrastructure"
      },
      {
        locality: "Wagholi (Nagar Road)",
        region: "East Pune",
        avgRateSqFt: "₹ 5,400 - ₹ 7,100",
        rentalYield: "3.5% - 4.1%",
        connectivityHighlights: "Nagar Road corridor, heavy vehicular congestion and water tanker dependency",
        verdict: "Affordable but infrastructure challenges"
      },
      {
        locality: "Moshi & Alandi Corridor",
        region: "North Pune / PCMC",
        avgRateSqFt: "₹ 5,200 - ₹ 6,600",
        rentalYield: "3.4% - 4.0%",
        connectivityHighlights: "Pimpri-Chinchwad municipal boundary, auto-hub proximity",
        verdict: "Industrial workforce residential hub"
      }
    ],
    macroPillars: [
      {
        title: "PMRDA 128-km Pune Ring Road",
        desc: "Signal-free expressway encircling Pune and Pimpri-Chinchwad with an interchange within 1.8 km of Charholi Budruk, unlocking direct 20-minute transit to PCMC auto hubs and Mumbai Expressway."
      },
      {
        title: "Pune International Airport (PNQ) Terminal 2",
        desc: "State-of-the-art expansion handling 16+ million passengers annually. Charholi Budruk is the nearest planned integrated township (4.8 km), capturing the highest aviation corporate executive rental demand."
      },
      {
        title: "Direct 8-Lane Kharadi-Charholi Tech Corridor",
        desc: "Dramatically cutting travel time to EON IT Park and World Trade Center to under 18 minutes, transforming Charholi into the natural residential choice for over 150,000 IT professionals."
      },
      {
        title: "Township vs Standalone Apartment Advantage",
        desc: "Pride World City provides 100% water self-sufficiency (7-acre freshwater lake, rainwater harvesting, STP), 70% open green reserves, on-campus K-12 Cambridge education, and zero dependence on municipal water tankers."
      }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOWNSHIP_DATA;
}
