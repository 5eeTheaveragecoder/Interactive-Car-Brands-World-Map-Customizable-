var map = L.map("map", {
  maxBounds: [
    [-85, -180],
    [85, 180],
  ],
  maxBoundsViscosity: 1.0,
  worldCopyJump: false,
  minZoom: 2.45,
}).setView([20, 0], 2);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap &copy; CartoDB",
  subdomains: "abcd",
  noWrap: true,
  maxZoom: 20,
}).addTo(map);

var brandMarkers = {};

var brands = [
  {
    name: "Audi",
    country: "Germany",
    coords: [48.7665, 11.4258],
    info: "Audi's origins trace back to August Horch, who founded August Horch & Cie in 1899. After some disputes, he established a new company in 1909, naming it Audi, which is the Latin translation of his surname's German meaning, \"listen.\" In 1932, Audi merged with three other German manufacturers – DKW, Horch, and Wanderer to form Auto Union, symbolized by the four interlinked rings that remain Audi's logo today. Today, Audi AG is a German automobile manufacturer of luxury vehicles and a subsidiary of the Volkswagen Group.",
    logo: "https://www.cdnlogo.com/logos/a/59/audi.svg",
    link: "https://www.audi.com/",
  },
  {
    name: "Toyota",
    country: "Japan",
    coords: [35.6895, 139.6917],
    info: "Toyota's journey began in the Japanese weaving industry when Sakichi Toyoda invented the world's first automatic loom, leading to the establishment of the Toyoda Spinning and Weaving Company in 1918. His son, Kiichiro Toyoda, later ventured into the automotive industry, and in 1937, the Toyota Motor Company was officially founded. Kiichiro's \"just-in-time\" philosophy became a cornerstone of the renowned Toyota Production System, emphasizing efficiency and minimal waste. Today, Toyota is a global automotive leader known for its quality, durability, and reliability.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Toyota_logo_%28Red%29.svg",
    link: "https://global.toyota/en/",
  },
  {
    name: "Ford",
    country: "USA",
    coords: [42.3314, -83.0458],
    info: "Founded by Henry Ford on June 16, 1903, the Ford Motor Company revolutionized the automotive industry with the introduction 1  of mass production techniques, most notably the moving assembly line, which made the automobile more accessible to the average person with the iconic Model T. Ford's early vision was to produce affordable, reliable vehicles for the masses, profoundly impacting transportation and industrial practices worldwide. Headquartered in Dearborn, Michigan, Ford has grown into a global automotive giant with a diverse range of vehicles.",
    logo: "https://images.seeklogo.com/logo-png/5/2/ford-logo-png_seeklogo-56584.png",
    link: "https://www.ford.com/",
  },
  {
    name: "BMW",
    country: "Germany",
    coords: [48.1351, 11.582],
    info: "BMW's origins trace back to 1916 with the establishment of Bayerische Flugzeugwerke (BFW), an aircraft engine manufacturer. In 1917, BFW was renamed Bayerische Motoren Werke (BMW). Following World War I, BMW shifted its focus to motorcycle and later automobile production, with their first car, the BMW 3/15, appearing in 1928. Known for their sporty handling, premium quality, and distinctive design elements like the kidney grille, BMW has grown into a globally recognized luxury automotive brand.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
    link: "https://www.bmw.com/",
  },
  {
    name: "Mercedes-Benz",
    country: "Germany",
    coords: [48.7758, 9.1829],
    info: "Mercedes-Benz was founded in 1926 with the merger of Daimler-Motoren-Gesellschaft (founded by Gottlieb Daimler and Carl Benz) and Benz & Cie. Carl Benz had created the first petrol-powered car in 1886, while Gottlieb Daimler followed suit in the same year. Their eventual unification under the name Mercedes-Benz, a suggestion inspired by Emil Jellinek's daughter Mercédès, created a brand synonymous with automotive luxury, innovation, and safety.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
    link: "https://www.mercedes-benz.com/",
  },
  {
    name: "Ferrari",
    country: "Italy",
    coords: [44.6416, 10.9262],
    info: "Ferrari's story began with Enzo Ferrari, who, after a career in racing and working for Alfa Romeo, founded Scuderia Ferrari in 1929 as a racing team for gentleman drivers. While initially focused on motorsports and preparing Alfa Romeo cars, Enzo Ferrari's ambition led him to establish his own car manufacturing company. The first car bearing the Ferrari name, the 125 S, was launched in 1947. Since then, Ferrari has become an iconic symbol of Italian luxury, high performance, and success in Formula One racing, producing some of the most coveted and powerful sports cars in the world.",
    logo: "https://images.seeklogo.com/logo-png/51/2/ferrari-logo-png_seeklogo-512505.png",
    link: "https://www.ferrari.com/",
  },
  {
    name: "Honda",
    country: "Japan",
    coords: [34.7304, 137.7236],
    info: "Honda's origins lie in the post-World War II era in Japan when Soichiro Honda established the Honda Technical Research Institute in 1946 to develop efficient internal combustion engines. This venture quickly evolved, and in 1948, the Honda Motor Company was officially founded. Initially focused on producing motorized bicycles and then motorcycles, Honda rapidly grew to become the world's largest motorcycle manufacturer by 1959. The company ventured into the automotive industry in 1963 with the T360 mini truck and the S500 sports car, eventually gaining global recognition for its reliable and fuel-efficient vehicles.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Honda.svg",
    link: "https://global.honda/",
  },
  {
    name: "Hyundai",
    country: "South Korea",
    coords: [37.5665, 126.978],
    info: 'Founded in 1967 by Chung Ju-yung as part of the Hyundai Group, Hyundai Motor Company initially collaborated with Ford before developing its own models, with the Pony being the first mass-produced South Korean car in 1975. Through continuous investment in quality, design, and technology, Hyundai has grown into a global automotive powerhouse, encompassing luxury vehicles under the Genesis brand and a dedicated electric vehicle lineup under the Ioniq sub-brand, all contributing to the overarching vision of "Progress for Humanity."',
    logo: "https://static.cdnlogo.com/logos/h/7/hyundai.png",
    link: "https://www.hyundai.com/worldwide/en",
  },
  {
    name: "Volvo",
    country: "Sweden",
    coords: [57.7089, 11.9746],
    info: "Volvo was founded in Gothenburg, Sweden, in 1927 by Assar Gabrielsson and Gustaf Larson, initially as a subsidiary of the ball bearing manufacturer SKF. The company's primary focus from the outset was on safety and durability, principles that have remained central to the brand's identity. Their first production car, the ÖV 4, nicknamed \"Jakob,\" was launched in 1927. Over the decades, Volvo has pioneered numerous safety innovations and has established itself as a leader in vehicle safety technology and Scandinavian design.",
    logo: "https://brandlogos.net/wp-content/uploads/2014/10/volvo_1999-2013-logo_brandlogos.net_v4iwj-300x287.png",
    link: "https://www.volvocars.com/",
  },
  {
    name: "Tesla",
    country: "USA",
    coords: [37.4848, -122.1484],
    info: 'Tesla was founded in 2003 by Martin Eberhard and Marc Tarpenning with the goal of producing electric sports cars. The name "Tesla" was chosen to honor the inventor Nikola Tesla. Early funding came from various sources, most notably Elon Musk, who joined the company in 2004, became chairman, and later CEO. Tesla\'s initial focus was on the Roadster, an all-electric sports car launched in 2008, which demonstrated the potential for high-performance electric vehicles. Today, Tesla is a leading global manufacturer of electric vehicles, solar panels, and battery energy storage systems.',
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    link: "https://www.tesla.com/",
  },
  {
    name: "Tata Motors",
    country: "India",
    coords: [18.98104, 72.826788],
    info: "Tata Motors, initially incorporated as the Tata Engineering and Locomotive Company (TELCO) in 1945, was conceived with the primary goal of manufacturing locomotives and other engineering products, contributing to India's burgeoning industrial base. However, the company's trajectory shifted significantly in 1954 under the leadership of J.R.D. Tata when it forged a crucial joint venture with Daimler-Benz of Germany. This collaboration marked Tata's entry into the automotive industry, establishing a manufacturing plant in Jamshedpur to produce Daimler commercial vehicles and laying the foundation for Tata Motors' prominent role in the Indian and global automotive landscape.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/250px-Tata_logo.svg.png",
    link: "https://www.tatamotors.com/",
  },
  {
    name: "Suzuki",
    country: "Japan",
    coords: [34.74, 137.757],
    info: "Suzuki's origins trace back to 1909 when Michio Suzuki founded the Suzuki Loom Works in Hamamatsu, Japan, initially producing weaving looms for Japan's silk industry. While successful in this venture, Suzuki sought diversification and began exploring automobile manufacturing in 1937, creating several compact car prototypes. However, World War II interrupted these efforts, and Suzuki returned to producing looms. After the war, with a need for affordable transportation, Suzuki launched its first motorized bicycle in 1952, followed by motorcycles, and in 1955, their first automobile, the Suzulight. Today, Suzuki is a global manufacturer known for its compact cars, motorcycles, all-terrain vehicles, and outboard marine engines.",
    logo: "https://images.seeklogo.com/logo-png/13/2/suzuki-logo-png_seeklogo-134277.png",
    link: "https://www.globalsuzuki.com/",
  },
  {
    name: "Mahindra",
    country: "India",
    coords: [19.076, 72.8777],
    info: "Mahindra & Mahindra was established in 1945 in Ludhiana, India, by brothers Kailash Chandra Mahindra and Jagdish Chandra Mahindra, along with Ghulam Mohammed, initially as Mahindra & Mohammed, a steel trading company. In 1947, after the partition of India, Ghulam Mohammed moved to Pakistan, and the company was renamed Mahindra & Mahindra in 1948. Recognizing the need for utility vehicles in the newly independent India, they began assembling Willys Jeeps, marking their entry into the automotive sector. Over the decades, Mahindra has diversified into various industries, including farm equipment, financial services, IT, and real estate, becoming a major conglomerate with a significant presence in the automotive market, particularly in the SUV and tractor segments.",
    logo: "https://images.seeklogo.com/logo-png/41/2/mahindra-suvs-logo-png_seeklogo-410248.png",
    link: "https://auto.mahindra.com/",
  },
  {
    name: "Kia",
    country: "South Korea",
    coords: [37.2636, 127.0286],
    info: "Kia Corporation, originally known as Kyungsung Precision Industry, was founded in 1944 in South Korea, initially manufacturing steel tubing and bicycle parts. It produced Korea's first domestic bicycle in 1951 and changed its name to Kia Industries in 1952. Kia began manufacturing Honda-licensed small motorcycles in 1957 and Mazda-licensed trucks in 1962 before opening its first integrated automotive assembly plant in 1973. Despite facing industry consolidation in the early 1980s, Kia re-entered the passenger car market in partnership with Ford in 1986 and established Kia Motors America in 1992. Following a period of bankruptcy, Kia became part of the Hyundai-Kia Automotive Group in 1998 and has since grown into a global automotive brand known for its design and innovation.",
    logo: "https://www.svgrepo.com/show/446883/kia.svg",
    link: "https://worldwide.kia.com/int",
  },
  {
    name: "Lamborghini",
    country: "Italy",
    coords: [44.6592, 11.021],
    info: "Founded by Ferruccio Lamborghini in 1963 with the aim of creating refined grand touring cars to rival Ferrari, Automobili Lamborghini S.p.A. quickly established itself as a manufacturer of high-performance luxury sports cars. Based in Sant'Agata Bolognese, Italy, Lamborghini is known for its bold designs, powerful engines, and the iconic raging bull emblem, often naming its models after famous fighting bulls. Over the years, Lamborghini has produced a series of legendary vehicles, becoming a symbol of Italian automotive excellence and desire.",
    logo: "https://cdn.worldvectorlogo.com/logos/lamborghini.svg",
    link: "https://www.lamborghini.com/en-en/",
  },
  {
    name: "Pagani",
    country: "Italy",
    coords: [44.7704, 10.8518],
    info: "Founded by Horacio Pagani in 1992 after his experience at Lamborghini, Pagani Automobili S.p.A. is an Italian manufacturer of hypercars and carbon fiber components. Based in San Cesario sul Panaro, near Modena, the company's philosophy blends art and science, inspired by Leonardo da Vinci, to create meticulously handcrafted, high-performance vehicles like the Zonda and Huayra, renowned for their innovative use of composite materials and powerful Mercedes-AMG engines.",
    logo: "https://brandlogos.net/wp-content/uploads/2017/01/pagani-logo.png",
    link: "https://www.pagani.com/",
  },
  {
    name: "Bugatti",
    country: "France",
    coords: [48.0731, 7.3601],
    info: "Bugatti's story began in 1909 in Molsheim, Alsace, with Ettore Bugatti, an Italian-born visionary who established Automobiles E. Bugatti. Renowned for their engineering brilliance, artistic design, and numerous racing victories, Bugatti cars quickly became symbols of luxury and performance. Despite financial challenges and changes in ownership over the years, the brand was revived in the modern era under the Volkswagen Group, producing groundbreaking hypercars like the Veyron and Chiron, which continue to push the boundaries of automotive engineering and design, honoring Ettore Bugatti's legacy of creating the incomparable.",
    logo: "https://brandlogos.net/wp-content/uploads/2021/11/bugatti-automobiles-logo.png",
    link: "https://www.bugatti.com/",
  },
  {
    name: "Porsche",
    country: "Germany",
    coords: [48.7758, 9.6829],
    info: "The origins of Porsche date back to 1931 when Ferdinand Porsche founded the company \"Dr. Ing. h. c. F. Porsche GmbH\" with the initial intention of providing design and engineering consulting services. However, Ferdinand's son, Ferry Porsche, driven by the desire for a sports car that didn't exist, spearheaded the creation of the first vehicle to bear the Porsche name, the 356, in 1948 in Gmünd, Austria. This marked the beginning of Porsche as a manufacturer of high-performance sports cars, a legacy that continues with iconic models like the 911.",
    logo: "https://upload.wikimedia.org/wikipedia/de/thumb/7/70/Porsche_Logo.svg/2995px-Porsche_Logo.svg.png",
    link: "https://www.porsche.com/international/",
  },
  {
    name: "Chevrolet",
    country: "USA",
    coords: [41.4993, -81.6944],
    info: "Chevrolet was founded on November 3, 1911, in Detroit, Michigan, by Swiss race car driver and automotive engineer Louis Chevrolet and William C. Durant, the ousted founder of General Motors. Durant envisioned creating a car that offered performance, style, and affordability to compete with Ford's popular Model T. The first Chevrolet car, the Series C Classic Six, was introduced in 1913. By 1918, Durant used the success of Chevrolet to reacquire a controlling stake in GM, merging Chevrolet into the General Motors family. Today, Chevrolet is a globally recognized brand known for its diverse range of vehicles, from cars and trucks to SUVs and electric vehicles.",
    logo: "https://images.seeklogo.com/logo-png/2/2/chevrolet-logo-png_seeklogo-29486.png",
    link: "https://www.chevrolet.com/",
  },
  {
    name: "Bentley",
    country: "UK",
    coords: [53.0687, -2.5197],
    info: 'Bentley Motors was founded by W.O. Bentley in London in 1919 with the mission to build "a fast car, a good car, the best in its class." Initially gaining fame for its racing successes, particularly at the 24 Hours of Le Mans in the 1920s, Bentley was later acquired by Rolls-Royce in 1931 and then by the Volkswagen Group in 1998. Based in Crewe, England, Bentley is renowned for producing handcrafted luxury cars that blend exceptional performance with exquisite craftsmanship and distinctive British design.',
    logo: "https://cdn.worldvectorlogo.com/logos/bentley-2.svg",
    link: "https://www.bentleymotors.com/en.html",
  },
  {
    name: "Dodge",
    country: "USA",
    coords: [42.5314, -83.0458],
    info: 'Founded by brothers John Francis Dodge and Horace Elgin Dodge, the Dodge Brothers Company was established in Detroit, Michigan, in 1900, initially as a machine shop supplying parts to other automakers like Ford. They began producing their own automobiles under the "Dodge Brothers" brand in 1914, quickly gaining a reputation for durable and reliable vehicles. After the untimely deaths of the brothers in 1920, the company was eventually sold to Chrysler Corporation in 1928, becoming a key part of its lineup and known for performance-oriented cars and trucks.',
    logo: "https://images.seeklogo.com/logo-png/4/2/dodge-logo-png_seeklogo-42647.png",
    link: "https://www.dodge.com/",
  },
  {
    name: "Hummer",
    country: "USA",
    coords: [38.9072, -77.0369],
    info: "The Hummer's origins lie in the High Mobility Multipurpose Wheeled Vehicle (HMMWV), or Humvee, developed by AM General for the U.S. military, entering service in the 1980s. Its ruggedness and off-road capabilities gained public attention, leading AM General to release a civilian version, the Hummer H1, in 1992. General Motors (GM) acquired the Hummer brand name in 1999, later introducing the H2 and H3 models. After discontinuing the brand in 2010, GM revived Hummer in 2020 under the GMC marque, launching the all-electric GMC Hummer EV pickup truck in 2021 and the SUV version in 2023, marking a significant shift towards electric mobility while retaining its iconic design.",
    logo: "https://www.svgrepo.com/show/446877/hummer.svg",
    link: "https://www.gmc.com/electric/hummer-ev/pickup-trucks-suvs",
  },
  {
    name: "Jaguar",
    country: "UK",
    coords: [52.4068, -1.5197],
    info: 'Jaguar\'s origins trace back to 1922 with the Swallow Sidecar Company, founded by William Lyons and William Walmsley, initially producing motorcycle sidecars before venturing into car bodies and eventually their own complete cars under the SS Cars name. The "Jaguar" name was first used in 1935 on the SS Jaguar saloon. After World War II, the SS Cars name had negative connotations, leading to the company officially being renamed Jaguar Cars in 1945. Renowned for their stylish designs and sporting heritage, Jaguar has produced numerous iconic vehicles and is now part of Jaguar Land Rover, a subsidiary of Tata Motors.',
    logo: "https://cdn.worldvectorlogo.com/logos/jaguar-cars.svg",
    link: "https://www.jaguar.com/",
  },
  {
    name: "Jeep",
    country: "USA",
    coords: [41.6639, -83.5552],
    info: 'The origin of Jeep is rooted in the U.S. military\'s need for a light reconnaissance vehicle at the onset of World War II. In 1941, the Willys-Overland company began mass production of the Willys MB, a rugged four-wheel-drive vehicle that quickly became an icon of American ingenuity and a crucial asset for the Allied forces. The term "jeep" itself was already in use as army slang for new recruits or vehicles, but the Willys MB solidified its association with this versatile 4x4. After the war, Willys trademarked the "Jeep" name and introduced civilian versions, establishing Jeep as a brand synonymous with off-road capability and adventure.',
    logo: "https://cdn.freebiesupply.com/logos/large/2x/jeep-5-logo-png-transparent.png",
    link: "https://www.jeep.com/",
  },
  {
    name: "Land Rover",
    country: "UK",
    coords: [52.3555, -1.1743],
    info: "Land Rover's story began in 1948 when the Rover Company unveiled the Series I at the Amsterdam Motor Show. Conceived by Maurice Wilks, it was designed as a versatile vehicle for agricultural and utility purposes, drawing inspiration from the Willys Jeep. Its success led to the development of subsequent models, establishing Land Rover as a brand synonymous with off-road capability and ruggedness. Over the decades, it evolved to include more luxurious models like the Range Rover, while still retaining its go-anywhere reputation, eventually becoming part of Jaguar Land Rover under Tata Motors' ownership.",
    logo: "https://brandlogos.net/wp-content/uploads/2014/11/land-rover-logo.png",
    link: "https://www.landrover.com/",
  },
  {
    name: "Lotus",
    country: "UK",
    coords: [52.6218, 1.3085],
    info: "Lotus Cars was founded by Colin Chapman in 1952 as Lotus Engineering Ltd. Based in the UK, Chapman's philosophy centered on lightweight construction and exceptional handling, principles evident in the early Lotus Mark VI race car and subsequent road-going models. Lotus gained significant success in Formula One racing, which heavily influenced its road car designs. Known for their minimalist approach and focus on the driving experience, Lotus cars have become icons of British sports car engineering. The company is currently undergoing a transformation with a move towards electrification and a broader range of vehicles.",
    logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/d/d4/Lotus_Cars_-_Logo.svg/2048px-Lotus_Cars_-_Logo.svg.png",
    link: "https://www.lotuscars.com/",
  },
  {
    name: "Maruti Suzuki",
    country: "India",
    coords: [28.6139, 77.209],
    info: "Maruti Suzuki India Limited was established in February 1981 as Maruti Udyog Limited, a company owned by the Government of India, with Suzuki Motor Corporation of Japan as a minor partner initially. The vision was to create an affordable \"people's car\" for the Indian market. Production began in 1983 with the iconic Maruti 800, based on the Suzuki Alto Kei car, which revolutionized personal transportation in India. Over the years, Suzuki increased its stake, and in 2007, the company was renamed Maruti Suzuki India Limited. Today, it stands as India's largest passenger car manufacturer, with a wide range of models catering to diverse needs.",
    logo: "https://brandlogos.net/wp-content/uploads/2014/01/maruti-suzuki-india-vector-logo.png",
    link: "https://www.marutisuzuki.com/",
  },
  {
    name: "Maserati",
    country: "Italy",
    coords: [44.6956, 10.9252],
    info: "Maserati was founded on December 1, 1914, in Bologna, Italy, by the Maserati brothers Alfieri, Bindo, Carlo, Ettore, and Ernesto, all of whom had a passion for automobiles. Initially focused on racing, the company's trident logo was inspired by the Fountain of Neptune in Bologna. Maserati later shifted its focus to producing luxury sports and grand touring cars, becoming renowned for its Italian design, performance, and distinctive engine sound. The company's headquarters are now located in Modena, Italy.",
    logo: "https://images.seeklogo.com/logo-png/8/2/maserati-logo-png_seeklogo-88997.png",
    link: "https://www.maserati.com/global/en",
  },
  {
    name: "Mazda",
    country: "Japan",
    coords: [34.3853, 132.4553],
    info: "Mazda began in 1920 in Hiroshima, Japan, as Toyo Cork Kogyo, producing cork products before transitioning to machine tools and then vehicles, with their first three-wheeled truck, the Mazda-Go, in 1931. The company officially adopted the name Mazda in 1984, inspired by Ahura Mazda, the Zoroastrian god of harmony, intelligence, and wisdom, and also a derivation of the founder Jujiro Matsuda's name, with their current logo symbolizing wings for agility and speed.",
    logo: "https://www.cdnlogo.com/logos/m/92/mazda.svg",
    link: "https://www.mazda.com/en/about/",
  },
  {
    name: "McLaren",
    country: "UK",
    coords: [51.3492, -0.5397],
    info: "McLaren Automotive, a British luxury automotive manufacturer based at the McLaren Technology Centre in Woking, England, traces its origins to Bruce McLaren Motor Racing, founded in 1963 by New Zealander Bruce McLaren, a Formula One driver; the road car division, initially known as McLaren Cars, was founded in 1985, leading to the iconic McLaren F1 in 1992, and after a period of dormancy, was re-established as McLaren Automotive in 2010, focusing on high-performance sports cars.",
    logo: "https://brandlogos.net/wp-content/uploads/2014/12/mclaren-logo.png",
    link: "https://cars.mclaren.com/en",
  },
  {
    name: "Mini",
    country: "UK",
    coords: [51.752, -1.2577],
    info: "MINI's modern iteration was born after BMW acquired the Rover Group in 1994; while Rover was eventually sold, BMW retained the MINI brand, relaunching it in 2001 with a new, retro-inspired model built in Oxford, England, paying homage to the original British Motor Corporation's Mini designed by Sir Alec Issigonis in 1959, which revolutionized small car design with its transverse engine and front-wheel drive",
    logo: "https://images.seeklogo.com/logo-png/55/3/mini-cooper-logo-png_seeklogo-556357.png",
    link: "https://www.mini.com/en_MS/home.html",
  },
  {
    name: "Mitsubishi",
    country: "Japan",
    coords: [35.6895, 139.5917],
    info: "Mitsubishi Motors Corporation's origins can be traced back to Mitsubishi Shipbuilding Co., Ltd. in 1917, which produced Japan's first series-production passenger car, the Model A; however, its significant automotive production began in the post-World War II era, becoming a separate entity, Mitsubishi Motors, in 1970 and known for its diverse range of vehicles, including off-road vehicles and rally-inspired cars.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Mitsubishi_logo.svg",
    link: "https://www.mitsubishi-motors.com/en/",
  },
  {
    name: "Nissan",
    country: "Japan",
    coords: [35.4437, 139.638],
    info: "Nissan Motor Co., Ltd. traces its origins to the Kwaishinsha Motor Car Works, founded in 1911 by Masujiro Hashimoto, which later became DAT Motorcar Co. in 1925; the Nissan name itself originated in the 1930s as an abbreviation of Nippon Sangyo, a holding conglomerate, and the company began producing cars under the Nissan brand in 1934, growing to become one of Japan's major automakers.",
    logo: "https://brandlogos.net/wp-content/uploads/2014/10/nissan-logo-preview-300x300.png",
    link: "https://www.nissan-global.com/EN/",
  },
  {
    name: "Renault",
    country: "France",
    coords: [48.8566, 2.3522],
    info: "Renault was founded in 1899 by Louis Renault and his brothers Marcel and Fernand as Société Renault Frères; Louis, an engineer, had previously built several prototypes, and the company quickly became known for its innovation, participating in early motorsport events and contributing significantly to the development of the French automotive industry.",
    logo: "https://www.svgrepo.com/show/446915/renault.svg",
    link: "https://group.renault.com/en/",
  },
  {
    name: "Subaru",
    country: "Japan",
    coords: [36.2048, 138.2529],
    info: "Subaru's automotive division emerged from Fuji Heavy Industries (FHI), a conglomerate with roots in the aircraft industry, established in 1953; the first Subaru car, the Subaru 1500 (P-1), was developed in 1954, and the company has since become known for its distinctive boxer engines and symmetrical all-wheel-drive systems, offering a range of reliable and capable vehicles.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Subaru_logo_%28transparent%29.svg/2560px-Subaru_logo_%28transparent%29.svg.png",
    link: "https://www.subaru.co.jp/en/worldwide/",
  },
  {
    name: "Rolls-Royce",
    country: "UK",
    coords: [50.853613, -0.74561],
    info: 'Rolls-Royce\'s story began in 1904 through a partnership between Charles Rolls, a car dealer, and Henry Royce, an engineer and carmaker; their shared commitment to "the best car in the world" led to the formation of Rolls-Royce Limited in 1906, renowned for its engineering excellence, luxurious craftsmanship, and the iconic Spirit of Ecstasy hood ornament. The automotive division is now owned by BMW since 1998.',
    logo: "https://images.seeklogo.com/logo-png/52/2/rolls-royce-logo-png_seeklogo-521324.png",
    link: "https://www.rolls-roycemotorcars.com/en_GB/home.html",
  },
  {
    name: "Lexus",
    country: "Japan",
    coords: [35.6895, 139.6717],
    info: "Lexus, the luxury vehicle division of Toyota Motor Corporation, was created around the same time as Japanese rivals Nissan and Honda developed their Infiniti and Acura premium brands, originating from a corporate project to develop a new premium sedan, code-named F1, which began in 1983 and culminated in the launch of the Lexus LS in 1989, with the brand now marketed in over 90 countries and territories worldwide.",
    logo: "https://images.icon-icons.com/2402/PNG/512/lexus_logo_icon_145808.png",
    link: "https://www.lexus.com",
  },
  {
    name: "BYD",
    country: "China",
    coords: [22.5431, 114.0579],
    info: "BYD Company Limited, a Chinese multinational manufacturing conglomerate headquartered in Shenzhen, was founded by Wang Chuanfu in February 1995 initially as a battery manufacturing company before its largest subsidiary, BYD Auto, was established in 2003; BYD Auto has since become the world's largest manufacturer of plug-in electric vehicles, alongside producing rechargeable batteries, forklifts, solar panels, semiconductors, and rail transit systems.",
    logo: "https://images.seeklogo.com/logo-png/47/2/byd-company-ltd-logo-png_seeklogo-473936.png",
    link: "https://www.byd.com",
  },
  {
    name: "Fiat",
    country: "Italy",
    coords: [45.0703, 7.6869],
    info: "Fiat Automobiles, the largest automobile manufacturer in Italy, traces its history back to 1899 with the founding of Fabbrica Italiana Automobili Torino (F.I.A.T.) by Giovanni Agnelli and several investors; the first Fiat car, the Fiat 4 HP, was produced in 1899, and the company quickly grew to become Italy's largest automotive firm by 1910, playing a significant role in the country's industrial development.",
    logo: "https://cdn.worldvectorlogo.com/logos/fiat-3.svg",
    link: "https://www.fiat.com",
  },
  {
    name: "Volkswagen",
    country: "Germany",
    coords: [52.4227, 10.7869],
    info: "Volkswagen, meaning \"people's car\" in German, was established in 1937 by the German government with the goal of producing an affordable car for the masses. Ferdinand Porsche was commissioned to design this vehicle, which eventually became the iconic Beetle. After World War II, Volkswagen came under British administration before being transferred back to German control. Through innovative models and strategic global expansion, Volkswagen has grown into one of the world's largest automobile manufacturers, encompassing a diverse range of vehicles and brands.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Volkswagen_-_Logo.svg/2048px-Volkswagen_-_Logo.svg.png",
    link: "https://www.vw.com/",
  },
];

brands.forEach(function (brand) {
  var icon = L.icon({
    iconUrl: brand.logo || "https://via.placeholder.com/30",
    iconSize: [35, 35],
    className: "custom-icon",
  });

  var popupContent = `
      <div class="popup-content">
        <img src="${brand.logo}" alt="${brand.name} logo" />
        <strong>${brand.name}</strong><br>
        ${brand.country}<br>
        <p>${brand.info}</p>
        <a href="${brand.link}" target="_blank">Visit this brand's website</a>
      </div>
    `;

  L.marker(brand.coords, { icon: icon }).addTo(map).bindPopup(popupContent);

  var marker = L.marker(brand.coords, { icon: icon })
    .addTo(map)
    .bindPopup(popupContent);

  brandMarkers[brand.name.toLowerCase()] = marker;
});

document.getElementById("search-input").addEventListener("input", function (e) {
  var query = e.target.value.toLowerCase().trim();
  if (brandMarkers[query]) {
    var marker = brandMarkers[query];
    map.setView(marker.getLatLng(), 10);
    marker.openPopup();
  }
});