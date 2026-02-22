import type { CityData, TestimonialData } from "@/types";

/* ============================================
   Navigation Links
   ============================================ */

export const NAV_LINKS = [
    { label: "Cities", href: "#cities" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
] as const;

/* ============================================
   Country + City Data
   ============================================ */

export const COUNTRIES = [
    { name: "United Kingdom", flag: "🇬🇧", code: "gb" },
    { name: "Australia", flag: "🇦🇺", code: "au" },
    { name: "Ireland", flag: "🇮🇪", code: "ie" },
    { name: "United States", flag: "🇺🇸", code: "us" },
    { name: "Canada", flag: "🇨🇦", code: "ca" },
    { name: "Germany", flag: "🇩🇪", code: "de" },
    { name: "Spain", flag: "🇪🇸", code: "es" },
] as const;

export const CITIES_BY_COUNTRY: Record<string, CityData[]> = {
    "United Kingdom": [
        { name: "London", country: "United Kingdom", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=400&fit=crop", propertyCount: 1240 },
        { name: "Birmingham", country: "United Kingdom", image: "https://images.unsplash.com/photo-1597933601815-e8770e6e3e56?w=400&h=400&fit=crop", propertyCount: 580 },
        { name: "Manchester", country: "United Kingdom", image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=400&h=400&fit=crop", propertyCount: 720 },
        { name: "Leicester", country: "United Kingdom", image: "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=400&h=400&fit=crop", propertyCount: 340 },
        { name: "Nottingham", country: "United Kingdom", image: "https://images.unsplash.com/photo-1584811644165-33db3b146db5?w=400&h=400&fit=crop", propertyCount: 410 },
        { name: "Liverpool", country: "United Kingdom", image: "https://images.unsplash.com/photo-1560264280-88b68371db39?w=400&h=400&fit=crop", propertyCount: 390 },
        { name: "Leeds", country: "United Kingdom", image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=400&h=400&fit=crop", propertyCount: 480 },
        { name: "Sheffield", country: "United Kingdom", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop", propertyCount: 310 },
        { name: "Newcastle", country: "United Kingdom", image: "https://images.unsplash.com/photo-1579873542903-b9064ba3c3fe?w=400&h=400&fit=crop", propertyCount: 260 },
        { name: "Cardiff", country: "United Kingdom", image: "https://images.unsplash.com/photo-1567456328557-2e0e0e216f14?w=400&h=400&fit=crop", propertyCount: 200 },
        { name: "Edinburgh", country: "United Kingdom", image: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?w=400&h=400&fit=crop", propertyCount: 350 },
        { name: "Glasgow", country: "United Kingdom", image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=400&h=400&fit=crop", propertyCount: 280 },
    ],
    "Australia": [
        { name: "Melbourne", country: "Australia", image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=400&h=400&fit=crop", propertyCount: 680 },
        { name: "Sydney", country: "Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=400&fit=crop", propertyCount: 920 },
        { name: "Brisbane", country: "Australia", image: "https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=400&h=400&fit=crop", propertyCount: 410 },
        { name: "Adelaide", country: "Australia", image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=400&h=400&fit=crop", propertyCount: 290 },
        { name: "Perth", country: "Australia", image: "https://images.unsplash.com/photo-1573935448851-40e1b1ab1b94?w=400&h=400&fit=crop", propertyCount: 250 },
        { name: "Gold Coast", country: "Australia", image: "https://images.unsplash.com/photo-1510253687799-457f0d5e65d5?w=400&h=400&fit=crop", propertyCount: 180 },
    ],
    "Ireland": [
        { name: "Dublin", country: "Ireland", image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?w=400&h=400&fit=crop", propertyCount: 540 },
        { name: "Cork", country: "Ireland", image: "https://images.unsplash.com/photo-1564959130747-897a8e5b4024?w=400&h=400&fit=crop", propertyCount: 210 },
        { name: "Galway", country: "Ireland", image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=400&h=400&fit=crop", propertyCount: 130 },
        { name: "Limerick", country: "Ireland", image: "https://images.unsplash.com/photo-1573594235221-5d6aeba81a6e?w=400&h=400&fit=crop", propertyCount: 90 },
    ],
    "United States": [
        { name: "New York", country: "United States", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=400&fit=crop", propertyCount: 1100 },
        { name: "Chicago", country: "United States", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400&h=400&fit=crop", propertyCount: 640 },
        { name: "Austin", country: "United States", image: "https://images.unsplash.com/photo-1588993608655-1e7b0e4ccfa7?w=400&h=400&fit=crop", propertyCount: 380 },
        { name: "Houston", country: "United States", image: "https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?w=400&h=400&fit=crop", propertyCount: 420 },
        { name: "Dallas", country: "United States", image: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?w=400&h=400&fit=crop", propertyCount: 350 },
        { name: "Philadelphia", country: "United States", image: "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=400&h=400&fit=crop", propertyCount: 290 },
    ],
    "Canada": [
        { name: "Toronto", country: "Canada", image: "https://images.unsplash.com/photo-1517090504332-eac35b2b91e4?w=400&h=400&fit=crop", propertyCount: 760 },
        { name: "Montreal", country: "Canada", image: "https://images.unsplash.com/photo-1559587297-c6348f932ff8?w=400&h=400&fit=crop", propertyCount: 430 },
        { name: "Vancouver", country: "Canada", image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=400&h=400&fit=crop", propertyCount: 510 },
        { name: "Ottawa", country: "Canada", image: "https://images.unsplash.com/photo-1540907489843-56a94f951123?w=400&h=400&fit=crop", propertyCount: 190 },
    ],
    "Germany": [
        { name: "Berlin", country: "Germany", image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=400&fit=crop", propertyCount: 580 },
        { name: "Munich", country: "Germany", image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=400&h=400&fit=crop", propertyCount: 340 },
        { name: "Frankfurt", country: "Germany", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=400&fit=crop", propertyCount: 270 },
        { name: "Hamburg", country: "Germany", image: "https://images.unsplash.com/photo-1562155847-c05f7386b204?w=400&h=400&fit=crop", propertyCount: 310 },
    ],
    "Spain": [
        { name: "Barcelona", country: "Spain", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=400&fit=crop", propertyCount: 450 },
        { name: "Madrid", country: "Spain", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=400&fit=crop", propertyCount: 380 },
        { name: "Valencia", country: "Spain", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop", propertyCount: 220 },
    ],
};

/* ============================================
   Stats Data
   ============================================ */

export const STATS = [
    { icon: "🛏️", title: "1 M+ Beds", description: "Book your perfect place from an extensive list of options.", color: "red" as const },
    { icon: "🎓", title: "800+ Universities", description: "Find the best student homes near prestigious universities.", color: "red" as const },
    { icon: "🌍", title: "250+ Global Cities", description: "We operate in major cities around the world.", color: "red" as const },
    { icon: "⭐", title: "4.8/5 on Trustpilot", description: "4800+ students have rated us excellent for our services.", color: "green" as const },
];

/* ============================================
   Features Data
   ============================================ */

export const FEATURES = [
    { icon: "⚡", title: "Quick & easy bookings", description: "Time is money. Save both when you book with us.", color: "red" as const },
    { icon: "💲", title: "Price Match Guarantee", description: "Find a lower price and we'll match it. No questions asked.", color: "red" as const, cta: "Learn More" },
    { icon: "📞", title: "24x7 Assistance", description: "If you have a doubt or a query, we're always a call away.", color: "red" as const },
    { icon: "✅", title: "100% Verified Listings", description: "We promise to deliver what you see on the website.", color: "green" as const },
];

/* ============================================
   Steps Data
   ============================================ */

export const BOOKING_STEPS = [
    { step: 1, icon: "🔍", title: "Discover and Finalise", description: "Choose from a plethora of verified student home listings" },
    { step: 2, icon: "📋", title: "Get your paperwork done", description: "Paperwork's on us, no need to fuss." },
    { step: 3, icon: "🎉", title: "Accommodation Booked!", description: "Relax, pack your bags, and unravel a new life chapter!" },
];

/* ============================================
   Testimonials Data
   ============================================ */

export const TESTIMONIALS: TestimonialData[] = [
    {
        name: "Simon Langer",
        university: "Plymouth College of Art",
        rating: 5,
        comment: "Experience was amazing!! I'm going to Plymouth College of Art. Great prices & the rent durations are negotiable. Also as an art student I do appreciate the website design — its clear, visible & well placed.",
        avatarGradient: "from-pink-400 to-rose-500",
        initials: "SL",
    },
    {
        name: "Paveneech Stritagul",
        university: "Imperial College Business School",
        rating: 5,
        comment: "The best service I could ask for an international student. Awesome, great follow-up services that helped me throughout the process from start to the end. Thanks to Nivaas for a great facility!",
        avatarGradient: "from-indigo-400 to-purple-600",
        initials: "PS",
    },
    {
        name: "Roberto Antonia",
        university: "University College London",
        rating: 5,
        comment: "I am going to study at UCL and Supreet from Nivaas did an excellent job in helping me. I do not have doubt to recommend Supreet as a student helper. The room is in an excellent location.",
        avatarGradient: "from-emerald-400 to-teal-400",
        initials: "RA",
    },
    {
        name: "Quezia Jones",
        university: "Lancaster University",
        rating: 5,
        comment: "Great assistance! They can find the perfect location for you, under the specifications you have given them. They have 24/7 support for you, they reply quickly and explain everything about any of your queries.",
        avatarGradient: "from-rose-400 to-yellow-300",
        initials: "QJ",
    },
    {
        name: "Bambee",
        university: "The University of Queensland",
        rating: 5,
        comment: "I was desperately finding a room in Brisbane, it was so hard. But with Nivaas assistance, in only one day I already had a room for myself for another year. Thank you so much!! ❤️",
        avatarGradient: "from-violet-300 to-pink-200",
        initials: "B",
    },
    {
        name: "Satya",
        university: "Illinois Institute of Technology",
        rating: 5,
        comment: "I was on a tight deadline and under many constraints. NivaasStudent really helped in what would otherwise have been a very stressful housing hunt! Thank you!",
        avatarGradient: "from-cyan-400 to-indigo-900",
        initials: "S",
    },
];

/* ============================================
   Amenities Master List
   ============================================ */

export const AMENITIES = [
    "WiFi", "Laundry", "Gym", "Swimming Pool", "Study Room",
    "Parking", "CCTV", "Power Backup", "Air Conditioning", "Heater",
    "Kitchen", "Dining Area", "Common Room", "Garden", "Terrace",
    "Elevator", "Wheelchair Access", "Pet Friendly", "Furnished",
    "Bills Included", "Cleaning Service", "24/7 Reception",
] as const;

/* ============================================
   Footer Links
   ============================================ */

export const FOOTER_LINKS = {
    company: [
        { label: "About", href: "/about" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Refer a Friend", href: "/refer" },
        { label: "Group Bookings", href: "/group", badge: "New" },
        { label: "List with us", href: "/list", badge: "New" },
        { label: "Partner with us", href: "/partner", badge: "New" },
        { label: "Careers", href: "/careers", badge: "Hiring!" },
    ],
    discover: [
        { label: "Blog", href: "/blog" },
        { label: "Podcast", href: "/podcast" },
        { label: "Newsroom", href: "/news" },
        { label: "Nivaas Plus", href: "/plus" },
        { label: "Scholarships", href: "/scholarships" },
        { label: "Exams", href: "/exams", badge: "New" },
    ],
    support: [
        { label: "Help Center", href: "/help" },
        { label: "Contact", href: "#contact" },
        { label: "T&C", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Sitemap", href: "/sitemap" },
    ],
};

export const SOCIAL_LINKS = [
    { label: "LinkedIn", href: "https://linkedin.com/company/nivaasstudent", icon: "linkedin" },
    { label: "Facebook", href: "https://facebook.com/nivaasstudent", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com/nivaasstudent", icon: "instagram" },
    { label: "YouTube", href: "https://youtube.com/channel/UCzm8GT3xWuXqQt9O7CFpqJw", icon: "youtube" },
    { label: "X", href: "https://twitter.com/nivaasstudent_", icon: "twitter" },
];

/* ============================================
   Search Placeholder Words
   ============================================ */

export const SEARCH_WORDS = ["City", "University", "Property", "City, University or Property"];
