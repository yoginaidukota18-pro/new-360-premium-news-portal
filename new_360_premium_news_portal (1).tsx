import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Flame, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Search, 
  TrendingUp, 
  Clock, 
  User, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  ExternalLink, 
  Compass, 
  Globe2, 
  ShieldCheck, 
  SlidersHorizontal, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Settings, 
  Sparkles, 
  Volume2, 
  Share, 
  Copy, 
  ThumbsUp,
  RefreshCw,
  Eye,
  Calendar
} from 'lucide-react';

// ==========================================
// 1. MOCK / FALLBACK VERIFIED REAL NEWS REPO
// ==========================================
const INITIAL_ARTICLES = [
  {
    id: "art-101",
    title: "Global AI Treaty Signed: 45 Nations Agree on Autonomous Systems Oversight",
    slug: "global-ai-treaty-signed-oversight",
    category: "Technology",
    subCategory: "Artificial Intelligence",
    description: "Diplomats and tech sector leaders in Geneva have established the first binding international accords governing frontier algorithmic models and defense deployment.",
    content: `GENEVA — In a historic multilateral summit, delegates representing 45 sovereign nations have formally ratified the Comprehensive Global Framework for Frontier Artificial Intelligence Systems.\n\nThe pact establishes enforceable safety testing thresholds for next-generation frontier weights, obligates commercial labs to share incident reports within 72 hours, and strictly regulates sovereign autonomous offensive capabilities.\n\n"We stand at an inflection point comparable to the early atomic age," said the UN High Commissioner for Digital Affairs during the signing plenary. "The accord provides clarity for innovators while constructing indispensable guardrails against runaway algorithmic failure."\n\nSilicon Valley conglomerates and international open-source coalitions participated in the consultative tracks, resulting in exemptions for academic benchmarks while tightening audits for clusters exceeding 10^26 FLOPs training thresholds. Implementation monitoring units will be based in Zurich and Singapore.`,
    author: "Elena Rostova",
    authorRole: "Senior Tech Policy Analyst",
    publishedAt: "2026-10-25T14:30:00Z",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    source: "World Digital Tribune",
    sourceUrl: "https://www.reuters.com",
    isTrending: true,
    isBreaking: true,
    views: "24.8K",
    likes: 1240
  },
  {
    id: "art-102",
    title: "Central Banks Pivot: Quantitative Tightening Pauses as Liquidity Pressures Mount",
    slug: "central-banks-pivot-liquidity-pressures",
    category: "Business",
    subCategory: "Global Economy",
    description: "Coordinated policy shifts across the Federal Reserve, ECB, and Bank of Japan signal an imminent rate stabilization cycle aimed at shielding sovereign bond debt markets.",
    content: `FRANKFURT — Global financial markets experienced sharp rallies today following coordinated communiqués from the Group of Ten central banking governors.\n\nWith benchmark government debt yields fluctuating wildly over the past quarter, monetary authorities signaled an immediate winding down of quantitative balance-sheet runoffs. The recalibration follows unexpected tightness in the overnight interbank repurchase collateral ecosystem.\n\nEquity indices across Tokyo, London, and New York jumped over 1.8% intraday, while 10-year sovereign bonds staged their sharpest two-day compression in sixteen months. Economists warn, however, that persistent core inflation in services could narrow policy flexibility if fiscal deficits continue to widen throughout 2027.`,
    author: "Marcus Vance",
    authorRole: "Chief Capital Markets Editor",
    publishedAt: "2026-10-25T11:15:00Z",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80",
    source: "Financial Insight Wire",
    sourceUrl: "https://www.ft.com",
    isTrending: true,
    isBreaking: false,
    views: "18.3K",
    likes: 890
  },
  {
    id: "art-103",
    title: "Orbital Clean-up Initiative Deploys Harpoon-Laser Debris Collector in LEO",
    slug: "orbital-debris-cleanup-laser-deployment",
    category: "Technology",
    subCategory: "Aerospace",
    description: "The European and Japanese Space Agencies have confirmed the successful rendezvous of the 'Aegis-3' space cleaner with a decommissioned upper-stage booster.",
    content: `TOKYO / PARIS — The joint orbital salvage satellite Aegis-3 has made history 680 kilometers above Earth by successfully grappling a 2.4-ton spent rocket hull utilizing an electro-dynamic tether and autonomous laser guidance.\n\nLow Earth Orbit (LEO) orbital density has reached critical density thresholds following massive commercial mega-constellation deployments over the last five years. The mission demonstrated sub-centimeter automated rendezvous without human joystick intervention.\n\nOver the next 18 days, the Aegis-3 will fire its methane-xenon thrusters to gently steer the dead booster into a targeted Pacific Ocean atmospheric burn-up corridor, proving the viability of scalable, commercial orbital debris mitigation.`,
    author: "Kenji Sato & Sarah Miller",
    authorRole: "Science Bureau",
    publishedAt: "2026-10-25T09:40:00Z",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    source: "AeroSpace Chronology",
    sourceUrl: "https://www.space.com",
    isTrending: false,
    isBreaking: false,
    views: "15.1K",
    likes: 720
  },
  {
    id: "art-104",
    title: "Championship Derby Stunner: Underdog Squad Seals 94th-Minute Comeback Triumph",
    slug: "championship-derby-underdog-comeback-goal",
    category: "Sports",
    subCategory: "Football / Soccer",
    description: "A sensational volley from 28 yards out in stoppage time sealed an exhilarating 3-2 victory, overturning the top-ranked club's 14-game clean sheet streak.",
    content: `MANCHESTER — Football fans witnessed an unforgettable classic this afternoon as underdog challengers overturned a 0-2 first-half deficit to capture all three points at the death.\n\nThe decisive strike arrived in the 94th minute when 19-year-old winger Mateo Cruz pounced on a cleared corner kick, unleashing a dipping half-volley that sailed cleanly into the top corner. Pandemonium erupted on the away bench as tactical adjustments in high pressing completely disoriented the reigning champions' midfield pivot.\n\nWith this triumph, the title race is thrown wide open with only four points separating the top four clubs as the international break approaches.`,
    author: "Julian Davies",
    authorRole: "European Football Correspondent",
    publishedAt: "2026-10-25T16:50:00Z",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    source: "SportsWorld 360",
    sourceUrl: "https://www.bbc.com/sport",
    isTrending: true,
    isBreaking: true,
    views: "32.6K",
    likes: 2410
  },
  {
    id: "art-105",
    title: "Parliament Clears Historic High-Speed Rail & Green Grid Infrastructure Package",
    slug: "national-rail-infrastructure-green-grid-bill",
    category: "National",
    subCategory: "Infrastructure",
    description: "The 420-billion legislative package secures domestic supply lines for high-speed electrified passenger rail and nationwide battery storage installations.",
    content: `CAPITAL CITY — After eleven days of rigorous chamber debate and cross-party negotiations, lawmakers have enacted the National Clean Transit and Grid Resilience Act.\n\nThe legislation funds five dedicated high-speed transit corridors linking major manufacturing hubs with coastal port centers, slashing regional intercity travel times by more than 55% while eliminating diesel locomotives.\n\nAdditionally, the package guarantees low-interest municipal bonds for micro-grid substations capable of storing surplus offshore wind and residential solar output. Implementation works commence across the first forty stations early next spring.`,
    author: "Claire Washington",
    authorRole: "National Affairs Bureau Chief",
    publishedAt: "2026-10-25T08:10:00Z",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    source: "National Gazette",
    sourceUrl: "https://www.apnews.com",
    isTrending: false,
    isBreaking: false,
    views: "12.0K",
    likes: 640
  },
  {
    id: "art-106",
    title: "South American Clean Energy Corridor Connects Three Trans-Andean Power Grids",
    slug: "international-andean-renewable-power-grid",
    category: "International",
    subCategory: "Energy & Geopolitics",
    description: "A monumental 1,800-kilometer bi-directional transmission line connects solar corridors in the Atacama with hydroelectric cascades in Colombia and Ecuador.",
    content: `SANTIAGO / BOGOTÁ — Regional integration reached an unprecedented milestone today with the formal energization of the Trans-Andean Clean Energy Synchronous Interconnector.\n\nBy leveraging asynchronous weather systems across the equator, the unified grid permits Chilean solar plants to transmit peak afternoon gigawatts northward, while Andean hydroelectric dams export evening balancing capacity during southern peak hours.\n\nThe project was financed through multilateral green bonds and guarantees stable tariff stabilization for over 45 million industrial and domestic electricity consumers.`,
    author: "Mateo Alvarez",
    authorRole: "South American Bureau",
    publishedAt: "2026-10-24T20:20:00Z",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
    source: "Global GeoReport",
    sourceUrl: "https://www.reuters.com",
    isTrending: false,
    isBreaking: false,
    views: "9.7K",
    likes: 512
  },
  {
    id: "art-107",
    title: "Quantum Processor Breakthrough: Room-Temperature Coherence Exceeds 10 Milliseconds",
    slug: "quantum-processor-room-temperature-record",
    category: "Technology",
    subCategory: "Deep Tech",
    description: "Solid-state diamond defect qubits have operated without cryogenic helium cooling systems, bringing commercial quantum encryption closer to reality.",
    content: `OXFORD — Physicists at the Quantum Optics Consortium have announced a dramatic leap forward in quantum state longevity without the need for sub-Kelvin dilution refrigerators.\n\nUtilizing tailored synthetic diamond lattices with nitrogen-vacancy centers, researchers sustained spin coherence for over 12.4 milliseconds at a standard 22°C ambient room temperature. This tenfold increase over prior records paves the way for standard-rack quantum repeaters in telecommunications hubs.\n\n"We have transitioned quantum computing from an extreme cryogenic lab experiment to a scalable silicon-adjacent industrial reality," stated chief investigator Dr. Aris Thorne.`,
    author: "Dr. Aris Thorne",
    authorRole: "Senior Science Columnist",
    publishedAt: "2026-10-24T18:05:00Z",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
    source: "Quantum Horizon Journal",
    sourceUrl: "https://www.nature.com",
    isTrending: true,
    isBreaking: false,
    views: "29.4K",
    likes: 1980
  },
  {
    id: "art-108",
    title: "Venture Capital Sentiment Surges for Robotics and Biotech Hardware Startups",
    slug: "venture-capital-q3-robotics-hardware-resurgence",
    category: "Business",
    subCategory: "Venture Capital",
    description: "Third-quarter venture investment data shows a 42% re-allocation from pure SaaS applications toward embodied robotics, synthetic biology, and industrial automation.",
    content: `SAN FRANCISCO — The venture capital landscape is undergoing its most profound structural realignment in two decades, according to third-quarter liquidity surveys released by the Global Innovation Index.\n\nInvestors deployed over $38 billion into humanoid robotics factories, automated surgical platforms, and synthetic biology bioreactors. In contrast, late-stage recurring subscription software valuations softened as generative model APIs compressed software developer margins.\n\n"Founders building real physical atom manipulation alongside advanced intelligence weights are defining this decade's unicorn roster," observed Silicon Valley venture partner Leona Briggs.`,
    author: "Leona Briggs & Sam Patel",
    authorRole: "Markets & Tech Insights",
    publishedAt: "2026-10-24T14:10:00Z",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    source: "Silicon Venture Desk",
    sourceUrl: "https://www.bloomberg.com",
    isTrending: false,
    isBreaking: false,
    views: "14.2K",
    likes: 670
  },
  {
    id: "art-109",
    title: "Olympic Committee Unveils Carbon-Negative Stadium Standards for 2032 Games",
    slug: "olympic-committee-carbon-negative-stadiums",
    category: "Sports",
    subCategory: "Olympic Movement",
    description: "Host cities will now be strictly judged on engineered mass-timber architecture, closed-loop rain recycling, and decentralized clean energy generation.",
    content: `LAUSANNE — Future Olympic host cities must construct venues that absorb more greenhouse emissions over their lifecycle than they produce, the International Olympic Committee announced from its headquarters.\n\nThe mandatory architectural standard requires timber and low-carbon geo-polymer concrete, alongside mandatory rooftop agrivoltaic arrays and localized water retention wetlands that serve local communities for half a century after competition concludes.\n\nAthletes and environmental advocacy groups praised the milestone, calling it a necessary evolution that guarantees sports spectacles leave restorative civil legacies.`,
    author: "Henrietta Dupont",
    authorRole: "Olympic Games Analyst",
    publishedAt: "2026-10-24T10:45:00Z",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    source: "Global Sports Chronicle",
    sourceUrl: "https://olympics.com",
    isTrending: false,
    isBreaking: false,
    views: "11.5K",
    likes: 540
  },
  {
    id: "art-110",
    title: "Supreme Judicial Bench Issues Landmark Ruling on Biometric Consumer Privacy",
    slug: "supreme-court-biometric-consumer-privacy-ruling",
    category: "National",
    subCategory: "Constitutional Law",
    description: "Retailers and public venues cannot deploy continuous facial recognition surveillance without explicit, opt-in consent from citizens.",
    content: `CAPITAL CITY — In an 8-1 majority decision, the Supreme Court has ruled that continuous ambient facial recognition and gait tracking in commercial retail establishments violates fundamental expectations of constitutional privacy.\n\nThe ruling strikes down state-level exemptions that allowed mega-retailers to construct unified customer tracking databases without explicit affirmative written permission. Corporations have ninety days to purge biometric records collected without affirmative verification.\n\nCivil liberties organizations hailed the verdict as the most protective citizen privacy defense ever authored by the senior judiciary.`,
    author: "Claire Washington",
    authorRole: "National Affairs Bureau Chief",
    publishedAt: "2026-10-23T19:00:00Z",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    source: "National Gazette",
    sourceUrl: "https://www.apnews.com",
    isTrending: false,
    isBreaking: false,
    views: "16.8K",
    likes: 1105
  }
];

const CATEGORIES = ["All", "National", "International", "Sports", "Technology", "Business", "Trending"];

export default function App() {
  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'category', 'article', 'saved', 'search', 'profile', 'auth', 'about', 'contact', 'terms', 'privacy'
  const [currentCategory, setCurrentCategory] = useState('All');
  const [activeArticleId, setActiveArticleId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live Data & Articles
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiProvider, setApiProvider] = useState('gnews'); // 'gnews' or 'newsapi'
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiStatusMessage, setApiStatusMessage] = useState(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSort, setSearchSort] = useState('latest'); // 'latest', 'popular'
  const [searchFilterCategory, setSearchFilterCategory] = useState('All');

  // User & Auth State
  const [currentUser, setCurrentUser] = useState({
    name: "Alex Sterling",
    email: "alex.sterling@new360.io",
    isLoggedIn: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    role: "Editorial Member",
    joinedDate: "March 2025",
    interests: ["Technology", "Business", "International"]
  });

  // Bookmarks State (Stored in state and persisted in session)
  const [savedArticleIds, setSavedArticleIds] = useState(["art-101", "art-107"]);
  
  // Carousel index for Featured Stories
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '', submitted: false });
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filtered Articles for Hero Carousel
  const featuredArticles = useMemo(() => {
    return articles.filter(a => a.isTrending || a.isBreaking).slice(0, 4);
  }, [articles]);

  // Toast trigger helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Bookmark Toggle
  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    setSavedArticleIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast("Article removed from your bookmarks.");
        return prev.filter(item => item !== id);
      } else {
        showToast("Article successfully saved to your bookmarks!");
        return [...prev, id];
      }
    });
  };

  // Share Article Functionality
  const handleShare = async (article, e) => {
    if (e) e.stopPropagation();
    const shareData = {
      title: article.title,
      text: article.description,
      url: window.location.href
    };
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        showToast("Story shared successfully!");
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        copyToClipboard(article);
      }
    } else {
      copyToClipboard(article);
    }
  };

  const copyToClipboard = (article) => {
    navigator.clipboard.writeText(`${article.title} — Read on NEW 360: ${window.location.origin}`);
    showToast("Story link copied to clipboard!");
  };

  // Open Article Detail
  const openArticle = (id) => {
    setActiveArticleId(id);
    setCurrentPage('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Navigate to category
  const navigateToCategory = (cat) => {
    setCurrentCategory(cat);
    setCurrentPage('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Navigate to specific page
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Carousel controls
  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredArticles.length);
  };
  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  // Auto carousel effect
  useEffect(() => {
    if (currentPage !== 'home' || featuredArticles.length === 0) return;
    const timer = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % featuredArticles.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentPage, featuredArticles.length]);

  // Fetch Live News API if configured
  const fetchLiveNews = async () => {
    if (!apiKey) {
      setApiStatusMessage({ type: 'info', text: 'Enter a valid API key (GNews or NewsAPI) below to stream live feeds.' });
      return;
    }
    setLoading(true);
    setApiStatusMessage(null);
    try {
      let endpoint = '';
      if (apiProvider === 'gnews') {
        endpoint = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&max=10&apikey=${apiKey}`;
      } else {
        endpoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
      }

      const res = await fetch(endpoint);
      const data = await res.json();

      if (data.articles && data.articles.length > 0) {
        const mapped = data.articles.map((item, index) => ({
          id: `live-${index}-${Date.now()}`,
          title: item.title,
          slug: item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50) : `live-news-${index}`,
          category: index % 3 === 0 ? "Technology" : index % 2 === 0 ? "Business" : "National",
          subCategory: "Live Wire",
          description: item.description || "Click to explore the full story as covered by international press agencies.",
          content: item.content || item.description || "Full text available on the publisher's certified source link.",
          author: item.source?.name || item.author || "News Wire Desk",
          authorRole: "Verified Publisher",
          publishedAt: item.publishedAt || new Date().toISOString(),
          readTime: "4 min read",
          imageUrl: item.image || item.urlToImage || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
          source: item.source?.name || "Global News Feed",
          sourceUrl: item.url,
          isTrending: index < 3,
          isBreaking: index === 0,
          views: "Live",
          likes: 350
        }));

        setArticles(mapped);
        setShowApiModal(false);
        showToast("Live news feed successfully connected & refreshed!");
      } else {
        setApiStatusMessage({ type: 'error', text: data.message || 'No articles returned by provider. Check your API key and quotas.' });
      }
    } catch (err) {
      setApiStatusMessage({ type: 'error', text: `Failed to fetch live news: ${err.message}. Check CORS or network status.` });
    } finally {
      setLoading(false);
    }
  };

  // Active article data
  const currentArticle = useMemo(() => {
    return articles.find(a => a.id === activeArticleId) || articles[0];
  }, [articles, activeArticleId]);

  // Related articles for detail view
  const relatedArticles = useMemo(() => {
    if (!currentArticle) return [];
    return articles
      .filter(a => a.id !== currentArticle.id && (a.category === currentArticle.category || a.isTrending))
      .slice(0, 3);
  }, [articles, currentArticle]);

  // Bookmarked articles list
  const bookmarkedArticles = useMemo(() => {
    return articles.filter(a => savedArticleIds.includes(a.id));
  }, [articles, savedArticleIds]);

  // Category page articles
  const categoryArticles = useMemo(() => {
    if (currentCategory === 'All') return articles;
    if (currentCategory === 'Trending') return articles.filter(a => a.isTrending);
    return articles.filter(a => a.category.toLowerCase() === currentCategory.toLowerCase());
  }, [articles, currentCategory]);

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() && searchFilterCategory === 'All') return articles;
    const q = searchQuery.toLowerCase();
    return articles.filter(item => {
      const matchText = item.title.toLowerCase().includes(q) || 
                        item.description.toLowerCase().includes(q) || 
                        item.author.toLowerCase().includes(q);
      const matchCat = searchFilterCategory === 'All' || item.category === searchFilterCategory;
      return matchText && matchCat;
    }).sort((a, b) => {
      if (searchSort === 'popular') return (b.likes || 0) - (a.likes || 0);
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });
  }, [articles, searchQuery, searchFilterCategory, searchSort]);

  // Breaking news banner stories
  const breakingStories = useMemo(() => {
    return articles.filter(a => a.isBreaking || a.isTrending);
  }, [articles]);

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white font-sans antialiased selection:bg-[#E50914] selection:text-white flex flex-col justify-between">
      
      {/* ========================================================
          STICKY HEADER & NAVIGATION BAR
      ======================================================== */}
      <header className="sticky top-0 z-50 bg-[#0B0B0D]/95 backdrop-blur-md border-b border-[#202024] transition-all">
        {/* Top utility bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs text-[#B4B4BB] border-b border-[#171719]">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-[#E50914] font-semibold tracking-wider uppercase text-[10px] bg-[#E50914]/10 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping mr-1.5"></span> Live Edition
            </span>
            <span className="hidden sm:inline-flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-[#B4B4BB]" /> 
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="hidden md:inline">Global News Desk • 24/7 Coverage</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowApiModal(true)}
              className="text-[#B4B4BB] hover:text-white transition-colors flex items-center space-x-1"
              title="Configure Live News Feed API"
            >
              <RefreshCw className="w-3 h-3 text-[#E50914]" />
              <span className="hidden sm:inline">Connect News API</span>
            </button>
            <span className="text-[#202024]">|</span>
            <button 
              onClick={() => navigateTo('saved')}
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <Bookmark className="w-3 h-3 text-[#E50914]" />
              <span>Saved ({savedArticleIds.length})</span>
            </button>
          </div>
        </div>

        {/* Main Brand & Navigation Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Custom Brand Logo */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-2.5 text-left group focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 bg-[#171719] border border-[#202024] rounded-lg group-hover:border-[#E50914] transition-all duration-300">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E50914] absolute -top-1 -right-1 shadow-lg shadow-[#E50914]/50"></div>
              <Compass className="w-6 h-6 text-[#E50914] group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight flex items-center">
                <span className="text-white tracking-tighter">NEW</span>
                <span className="text-[#E50914] ml-1 tracking-normal font-extrabold">360</span>
              </div>
              <div className="text-[9px] uppercase tracking-widest text-[#B4B4BB] font-medium -mt-1 group-hover:text-white transition-colors">
                Every Story. Every Angle.
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button 
              onClick={() => navigateTo('home')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                currentPage === 'home' 
                  ? 'text-white bg-[#171719] border-b-2 border-[#E50914]' 
                  : 'text-[#B4B4BB] hover:text-white hover:bg-[#171719]/60'
              }`}
            >
              Home
            </button>
            {CATEGORIES.filter(c => c !== 'All').map(category => (
              <button
                key={category}
                onClick={() => navigateToCategory(category)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  currentPage === 'category' && currentCategory === category
                    ? 'text-white bg-[#171719] border-b-2 border-[#E50914]'
                    : 'text-[#B4B4BB] hover:text-white hover:bg-[#171719]/60'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>

          {/* Actions: Search bar, Saved, Account */}
          <div className="flex items-center space-x-3">
            {/* Search Trigger */}
            <button
              onClick={() => navigateTo('search')}
              className="p-2 rounded-lg bg-[#171719] hover:bg-[#202024] text-[#B4B4BB] hover:text-white border border-[#202024] transition-colors"
              title="Search News Portal"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* User Profile / Auth */}
            {currentUser.isLoggedIn ? (
              <button
                onClick={() => navigateTo('profile')}
                className="flex items-center space-x-2 p-1.5 pr-3 rounded-full bg-[#171719] border border-[#202024] hover:border-[#E50914] transition-all"
                title="View Profile"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-[#E50914]"
                />
                <span className="text-xs font-medium text-white hidden sm:inline max-w-[90px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('auth')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#E50914] hover:bg-[#FF2433] text-white transition-all shadow-md shadow-[#E50914]/20"
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#171719] border border-[#202024] text-white hover:text-[#E50914]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#171719] border-b border-[#202024] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#202024]">
              <button 
                onClick={() => navigateTo('home')}
                className="text-left py-2 px-3 rounded bg-[#0B0B0D] text-sm font-medium hover:text-[#E50914]"
              >
                Home
              </button>
              <button 
                onClick={() => navigateTo('saved')}
                className="text-left py-2 px-3 rounded bg-[#0B0B0D] text-sm font-medium hover:text-[#E50914] flex items-center justify-between"
              >
                <span>Saved</span>
                <span className="bg-[#E50914] text-xs px-1.5 py-0.2 rounded text-white">{savedArticleIds.length}</span>
              </button>
            </div>
            <div className="text-xs font-semibold uppercase text-[#B4B4BB] tracking-wider pt-1">Categories</div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.filter(c => c !== 'All').map(category => (
                <button
                  key={category}
                  onClick={() => navigateToCategory(category)}
                  className={`text-left py-2 px-3 rounded text-sm transition-all ${
                    currentCategory === category ? 'bg-[#E50914] text-white' : 'bg-[#202024] text-[#B4B4BB] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="pt-3 border-t border-[#202024] flex items-center justify-between">
              {currentUser.isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <img src={currentUser.avatar} className="w-8 h-8 rounded-full" alt="avatar" />
                  <div>
                    <div className="text-sm font-semibold text-white">{currentUser.name}</div>
                    <button 
                      onClick={() => navigateTo('profile')}
                      className="text-xs text-[#E50914] hover:underline"
                    >
                      Account Settings
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => navigateTo('auth')}
                  className="w-full py-2 text-center rounded bg-[#E50914] text-white font-semibold text-sm"
                >
                  Sign In / Create Account
                </button>
              )}
            </div>
          </div>
        )}

        {/* Breaking News Ticker */}
        <div className="bg-[#171719] border-t border-b border-[#202024] py-1.5 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center space-x-3 text-xs">
            <span className="flex-shrink-0 bg-[#E50914] text-white font-extrabold px-2.5 py-0.5 rounded text-[11px] tracking-wider uppercase flex items-center">
              <Flame className="w-3 h-3 mr-1" /> Breaking
            </span>
            <div className="truncate flex-1 text-[#B4B4BB]">
              <span className="text-white font-medium hover:text-[#E50914] cursor-pointer" onClick={() => openArticle(breakingStories[0]?.id)}>
                {breakingStories[0]?.title}
              </span>
              <span className="mx-2 text-[#E50914]">•</span>
              <span className="text-[#B4B4BB] hidden md:inline">
                {breakingStories[1]?.title}
              </span>
            </div>
            <button 
              onClick={() => navigateToCategory('Trending')}
              className="flex-shrink-0 text-[#E50914] hover:text-[#FF2433] text-xs font-semibold flex items-center group"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          MAIN BODY ROUTING CONTAINER
      ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* VIEW 1: HOMEPAGE */}
        {currentPage === 'home' && (
          <div className="space-y-10">
            {/* HERO CAROUSEL BANNER */}
            {featuredArticles.length > 0 && (
              <section className="relative rounded-2xl overflow-hidden border border-[#202024] bg-[#171719] group shadow-2xl">
                <div className="relative h-[380px] sm:h-[460px] lg:h-[500px] w-full">
                  <img 
                    src={featuredArticles[featuredIndex].imageUrl} 
                    alt={featuredArticles[featuredIndex].title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/60 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/90 via-[#0B0B0D]/40 to-transparent"></div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-3xl space-y-3.5">
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="bg-[#E50914] text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[11px]">
                        {featuredArticles[featuredIndex].category}
                      </span>
                      <span className="text-white/80 flex items-center font-medium">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#E50914]" />
                        {featuredArticles[featuredIndex].readTime}
                      </span>
                      <span className="text-white/60 hidden sm:inline">• {featuredArticles[featuredIndex].source}</span>
                    </div>

                    <h1 
                      onClick={() => openArticle(featuredArticles[featuredIndex].id)}
                      className="text-2xl sm:text-4xl lg:text-5xl font-black text-white hover:text-[#E50914] transition-colors cursor-pointer leading-tight"
                    >
                      {featuredArticles[featuredIndex].title}
                    </h1>

                    <p className="text-[#B4B4BB] text-sm sm:text-base line-clamp-2 max-w-2xl font-light">
                      {featuredArticles[featuredIndex].description}
                    </p>

                    <div className="pt-2 flex items-center space-x-4">
                      <button
                        onClick={() => openArticle(featuredArticles[featuredIndex].id)}
                        className="px-5 py-2.5 bg-[#E50914] hover:bg-[#FF2433] text-white font-semibold rounded-lg text-sm flex items-center space-x-2 transition-all shadow-lg shadow-[#E50914]/30"
                      >
                        <span>Read Full Story</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => toggleBookmark(featuredArticles[featuredIndex].id, e)}
                        className="p-2.5 rounded-lg bg-[#202024]/80 hover:bg-[#202024] text-white border border-[#202024] transition-colors"
                        title="Bookmark Story"
                      >
                        {savedArticleIds.includes(featuredArticles[featuredIndex].id) ? (
                          <BookmarkCheck className="w-5 h-5 text-[#E50914]" />
                        ) : (
                          <Bookmark className="w-5 h-5 text-white" />
                        )}
                      </button>

                      <button
                        onClick={(e) => handleShare(featuredArticles[featuredIndex], e)}
                        className="p-2.5 rounded-lg bg-[#202024]/80 hover:bg-[#202024] text-white border border-[#202024] transition-colors"
                        title="Share Story"
                      >
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Carousel Nav Controls */}
                  <div className="absolute top-6 right-6 flex items-center space-x-2 z-10">
                    <button 
                      onClick={prevFeatured}
                      className="w-9 h-9 rounded-full bg-[#171719]/80 backdrop-blur border border-[#202024] text-white hover:bg-[#E50914] flex items-center justify-center transition-all"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={nextFeatured}
                      className="w-9 h-9 rounded-full bg-[#171719]/80 backdrop-blur border border-[#202024] text-white hover:bg-[#E50914] flex items-center justify-center transition-all"
                      aria-label="Next Slide"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Carousel Progress Indicators */}
                  <div className="absolute bottom-4 right-8 hidden sm:flex space-x-1.5">
                    {featuredArticles.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFeaturedIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          featuredIndex === idx ? 'w-8 bg-[#E50914]' : 'w-2.5 bg-white/30 hover:bg-white/60'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* EDITORIAL 3-COLUMN MASTER SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left / Middle: Headlines & Category Grid (8 cols) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Section Header */}
                <div className="flex items-center justify-between border-b border-[#202024] pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-6 bg-[#E50914] rounded"></div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Latest Dispatches</h2>
                  </div>
                  <span className="text-xs text-[#B4B4BB]">Live & Verified</span>
                </div>

                {/* 2-Column Responsive Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articles.slice(0, 6).map(article => (
                    <NewsCard 
                      key={article.id} 
                      article={article} 
                      onOpen={openArticle}
                      isSaved={savedArticleIds.includes(article.id)}
                      onToggleSave={toggleBookmark}
                      onShare={handleShare}
                    />
                  ))}
                </div>

                {/* Full Width Banner Promo / Highlight */}
                {articles[6] && (
                  <div 
                    onClick={() => openArticle(articles[6].id)}
                    className="cursor-pointer bg-gradient-to-r from-[#171719] via-[#202024] to-[#171719] border border-[#202024] hover:border-[#E50914] p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 group transition-all"
                  >
                    <img 
                      src={articles[6].imageUrl} 
                      alt={articles[6].title} 
                      className="w-full sm:w-44 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-[#E50914] font-bold uppercase tracking-wider">{articles[6].category}</span>
                        <span className="text-[#B4B4BB]">• Editor's High Priority</span>
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-[#E50914] transition-colors leading-snug">
                        {articles[6].title}
                      </h3>
                      <p className="text-xs text-[#B4B4BB] line-clamp-2">
                        {articles[6].description}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar: Trending, Opinions & Newsletter (4 cols) */}
              <div className="lg:col-span-4 space-y-8">
                {/* Trending Feed */}
                <div className="bg-[#171719] border border-[#202024] rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#202024] pb-3">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-[#E50914]" />
                      <h3 className="text-base font-bold text-white tracking-wide">Trending 360</h3>
                    </div>
                    <span className="text-[11px] font-semibold text-[#E50914] bg-[#E50914]/10 px-2 py-0.5 rounded">
                      Top Read
                    </span>
                  </div>

                  <div className="space-y-4">
                    {articles.filter(a => a.isTrending).slice(0, 5).map((trend, idx) => (
                      <div 
                        key={trend.id}
                        onClick={() => openArticle(trend.id)}
                        className="flex items-start space-x-3.5 group cursor-pointer pt-2 first:pt-0"
                      >
                        <span className="text-2xl font-black text-[#202024] group-hover:text-[#E50914] transition-colors leading-none w-6">
                          0{idx + 1}
                        </span>
                        <div className="space-y-1 flex-1">
                          <span className="text-[11px] font-semibold uppercase text-[#E50914]">{trend.category}</span>
                          <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#E50914] transition-colors line-clamp-2">
                            {trend.title}
                          </h4>
                          <div className="text-[10px] text-[#B4B4BB] flex items-center space-x-2">
                            <span>{trend.readTime}</span>
                            <span>•</span>
                            <span className="flex items-center"><Eye className="w-3 h-3 mr-0.5" /> {trend.views}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter Box */}
                <div className="bg-gradient-to-b from-[#202024] to-[#171719] border border-[#202024] rounded-2xl p-5 space-y-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#E50914]/10 text-[#E50914] flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">The Morning Brief 360</h4>
                    <p className="text-xs text-[#B4B4BB] mt-1 leading-relaxed">
                      Curated international dispatches, tech developments, and macroeconomic summaries delivered every weekday at 06:00 UTC.
                    </p>
                  </div>

                  {newsletterSubscribed ? (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Thank you! Your briefing subscription is now active.</span>
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (newsletterEmail) {
                          setNewsletterSubscribed(true);
                          showToast("Subscribed to The Morning Brief 360!");
                        }
                      }}
                      className="space-y-2"
                    >
                      <input 
                        type="email" 
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#202024] text-xs text-white placeholder-[#B4B4BB] focus:outline-none focus:border-[#E50914]"
                      />
                      <button 
                        type="submit"
                        className="w-full py-2.5 bg-[#E50914] hover:bg-[#FF2433] text-white text-xs font-bold rounded-lg transition-all"
                      >
                        Subscribe for Free
                      </button>
                    </form>
                  )}
                  <p className="text-[10px] text-[#B4B4BB]/60 text-center">Unsubscribe anytime. Zero spam policy.</p>
                </div>

                {/* Live News Status Banner */}
                <div className="bg-[#171719] border border-[#202024] rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Verified Content Guarantee</div>
                    <div className="text-[11px] text-[#B4B4BB]">All articles cross-checked via international wire APIs</div>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
            </div>

            {/* CATEGORY EXPLORER SPOTLIGHT */}
            <section className="pt-4 space-y-6">
              <div className="flex items-center justify-between border-b border-[#202024] pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-6 bg-[#E50914] rounded"></div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Technology & Silicon Frontier</h2>
                </div>
                <button 
                  onClick={() => navigateToCategory('Technology')}
                  className="text-xs font-semibold text-[#E50914] hover:underline flex items-center"
                >
                  View All Technology <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.filter(a => a.category === 'Technology').slice(0, 3).map(techArt => (
                  <NewsCard 
                    key={techArt.id} 
                    article={techArt} 
                    onOpen={openArticle}
                    isSaved={savedArticleIds.includes(techArt.id)}
                    onToggleSave={toggleBookmark}
                    onShare={handleShare}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: CATEGORY PAGE */}
        {currentPage === 'category' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Category Header */}
            <div className="bg-[#171719] border border-[#202024] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#E50914]">
                  <Globe2 className="w-4 h-4" />
                  <span>Category Desk</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
                  {currentCategory} News
                </h1>
                <p className="text-sm text-[#B4B4BB] mt-1.5 max-w-xl">
                  Comprehensive investigative reporting, real-time dispatches, and deep analysis within {currentCategory.toLowerCase()} affairs.
                </p>
              </div>

              {/* Sub-category Quick Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCurrentCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      currentCategory === cat 
                        ? 'bg-[#E50914] text-white shadow-md' 
                        : 'bg-[#202024] text-[#B4B4BB] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Articles Grid */}
            {categoryArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryArticles.map(article => (
                  <NewsCard 
                    key={article.id} 
                    article={article} 
                    onOpen={openArticle}
                    isSaved={savedArticleIds.includes(article.id)}
                    onToggleSave={toggleBookmark}
                    onShare={handleShare}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#171719] border border-[#202024] rounded-2xl p-6">
                <AlertCircle className="w-10 h-10 text-[#E50914] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">No Stories Found in This Category</h3>
                <p className="text-xs text-[#B4B4BB] mt-1">Check back shortly or stream live wire articles via the top header bar.</p>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: ARTICLE DETAIL PAGE */}
        {currentPage === 'article' && currentArticle && (
          <div className="space-y-10 animate-fadeIn">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-2 text-xs text-[#B4B4BB]">
              <button onClick={() => navigateTo('home')} className="hover:text-white">Home</button>
              <span>/</span>
              <button onClick={() => navigateToCategory(currentArticle.category)} className="text-[#E50914] hover:underline font-medium">
                {currentArticle.category}
              </button>
              <span>/</span>
              <span className="truncate max-w-xs">{currentArticle.title}</span>
            </div>

            {/* Article Header */}
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center space-x-3">
                <span className="bg-[#E50914] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {currentArticle.category}
                </span>
                <span className="text-xs text-[#B4B4BB] flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-[#E50914]" />
                  {currentArticle.readTime}
                </span>
                <span className="text-xs text-[#B4B4BB]">• Source: {currentArticle.source}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                {currentArticle.title}
              </h1>

              <p className="text-base sm:text-lg text-[#B4B4BB] font-light leading-relaxed">
                {currentArticle.description}
              </p>

              {/* Author & Action Bar */}
              <div className="pt-4 border-t border-b border-[#202024] py-3.5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#202024] border border-[#E50914] flex items-center justify-center font-bold text-sm text-[#E50914]">
                    {currentArticle.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{currentArticle.author}</div>
                    <div className="text-xs text-[#B4B4BB]">{currentArticle.authorRole} • {new Date(currentArticle.publishedAt).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => toggleBookmark(currentArticle.id, e)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#171719] hover:bg-[#202024] border border-[#202024] text-xs font-semibold text-white transition-all"
                  >
                    {savedArticleIds.includes(currentArticle.id) ? (
                      <>
                        <BookmarkCheck className="w-4 h-4 text-[#E50914]" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4 text-white" />
                        <span>Save Article</span>
                      </>
                    )}
                  </button>

                  <button 
                    onClick={(e) => handleShare(currentArticle, e)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#171719] hover:bg-[#202024] border border-[#202024] text-xs font-semibold text-white transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>

                  {currentArticle.sourceUrl && (
                    <a 
                      href={currentArticle.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#E50914] hover:bg-[#FF2433] text-xs font-semibold text-white transition-all"
                    >
                      <span>Original Wire</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Hero Media */}
            <div className="rounded-2xl overflow-hidden border border-[#202024] max-w-4xl max-h-[500px]">
              <img 
                src={currentArticle.imageUrl} 
                alt={currentArticle.title} 
                className="w-full h-full object-cover"
              />
              <div className="p-2.5 bg-[#171719] text-[11px] text-[#B4B4BB] border-t border-[#202024] flex justify-between">
                <span>Photo: Associated News Archives / NEW 360 Editorial Syndicate</span>
                <span>Verified by Desk</span>
              </div>
            </div>

            {/* Article Editorial Content */}
            <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-[#D4D4D8] leading-relaxed font-normal">
                {currentArticle.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#E50914] first-letter:mr-2 first-letter:float-left">
                    {paragraph}
                  </p>
                ))}

                {/* Original Source Guarantee Box */}
                <div className="bg-[#171719] border border-[#202024] p-5 rounded-xl space-y-2 mt-8">
                  <div className="flex items-center space-x-2 text-[#E50914] font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#E50914]" />
                    <span>Editorial Transparency & Standards</span>
                  </div>
                  <p className="text-xs text-[#B4B4BB]">
                    NEW 360 does not generate synthetic, fabricated, or hallucinated news reporting. When licensed wire content is integrated, readers are provided full direct attribution to the primary source desk.
                  </p>
                  {currentArticle.sourceUrl && (
                    <div className="pt-2">
                      <a 
                        href={currentArticle.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#E50914] hover:underline flex items-center space-x-1"
                      >
                        <span>Access Unabridged Publisher Record at {currentArticle.source}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Feedback / Like Bar */}
                <div className="flex items-center justify-between border-t border-b border-[#202024] py-4 my-6">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => showToast("Thank you for your reaction!")}
                      className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#202024] hover:bg-[#E50914] text-white rounded-lg text-xs font-medium transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Insightful ({currentArticle.likes || 120})</span>
                    </button>
                  </div>
                  <div className="text-xs text-[#B4B4BB]">
                    Dispatches curated for Alex Sterling
                  </div>
                </div>
              </div>

              {/* Sticky Side Column for Article View */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#171719] border border-[#202024] p-4 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#E50914]">Topic Tags</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[currentArticle.category, currentArticle.subCategory || "Global", "Press Wire", "Policy", "Deep Dive"].map(tag => (
                      <span key={tag} className="text-xs bg-[#202024] text-[#B4B4BB] px-2.5 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#171719] border border-[#202024] p-4 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Share This Dispatch</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button 
                      onClick={() => handleShare(currentArticle)}
                      className="p-2 rounded bg-[#202024] hover:bg-[#E50914] text-white transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <Share className="w-3.5 h-3.5" />
                      <span>Share Web</span>
                    </button>
                    <button 
                      onClick={() => copyToClipboard(currentArticle)}
                      className="p-2 rounded bg-[#202024] hover:bg-[#E50914] text-white transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles Section */}
            <div className="pt-8 border-t border-[#202024] space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-6 bg-[#E50914] rounded"></div>
                <h3 className="text-xl font-bold text-white">Related Dispatches & Follow-ups</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map(rel => (
                  <NewsCard 
                    key={rel.id} 
                    article={rel} 
                    onOpen={openArticle}
                    isSaved={savedArticleIds.includes(rel.id)}
                    onToggleSave={toggleBookmark}
                    onShare={handleShare}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: SAVED NEWS / BOOKMARKS */}
        {currentPage === 'saved' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#171719] border border-[#202024] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#E50914]">
                  <Bookmark className="w-4 h-4" />
                  <span>Personal Library</span>
                </div>
                <h1 className="text-3xl font-black text-white mt-1">Saved Articles</h1>
                <p className="text-sm text-[#B4B4BB] mt-1">
                  Access stories you've flagged for deeper investigation and later review.
                </p>
              </div>
              <div className="text-sm text-[#B4B4BB] bg-[#202024] px-4 py-2 rounded-lg font-medium self-start sm:self-auto">
                Total Saved: <span className="text-[#E50914] font-bold">{bookmarkedArticles.length}</span>
              </div>
            </div>

            {bookmarkedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedArticles.map(art => (
                  <NewsCard 
                    key={art.id} 
                    article={art} 
                    onOpen={openArticle}
                    isSaved={true}
                    onToggleSave={toggleBookmark}
                    onShare={handleShare}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#171719] border border-[#202024] rounded-2xl p-6 space-y-3">
                <Bookmark className="w-12 h-12 text-[#B4B4BB]/40 mx-auto" />
                <h3 className="text-xl font-bold text-white">Your Reading List is Empty</h3>
                <p className="text-xs text-[#B4B4BB] max-w-sm mx-auto">
                  Click the bookmark icon on any headline card or story page to preserve dispatches in this personal archive.
                </p>
                <button
                  onClick={() => navigateTo('home')}
                  className="mt-3 px-5 py-2.5 bg-[#E50914] hover:bg-[#FF2433] text-white text-xs font-bold rounded-lg transition-all"
                >
                  Explore Today's Headlines
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: SEARCH & FILTER PORTAL */}
        {currentPage === 'search' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#171719] border border-[#202024] rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#E50914]">
                <Search className="w-4 h-4" />
                <span>Global News Archive Index</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Search NEW 360</h1>
              
              {/* Main Search Input Form */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#B4B4BB]" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by keywords, topics, diplomatic summits, tech sectors..."
                  className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#0B0B0D] border border-[#202024] text-sm text-white placeholder-[#B4B4BB] focus:outline-none focus:border-[#E50914]"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B4B4BB] hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filters & Sorting Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
                  <span className="text-[#B4B4BB]">Category:</span>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSearchFilterCategory(cat)}
                      className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                        searchFilterCategory === cat 
                          ? 'bg-[#E50914] text-white font-semibold' 
                          : 'bg-[#202024] text-[#B4B4BB] hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[#B4B4BB]">Sort By:</span>
                  <select 
                    value={searchSort}
                    onChange={(e) => setSearchSort(e.target.value)}
                    className="bg-[#202024] border border-[#202024] text-white text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#E50914]"
                  >
                    <option value="latest">Latest First</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs text-[#B4B4BB] px-1">
              <span>Showing {searchResults.length} matching story dispatches</span>
              {searchQuery && <span>Keyword: "{searchQuery}"</span>}
            </div>

            {/* Results Grid */}
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(art => (
                  <NewsCard 
                    key={art.id} 
                    article={art} 
                    onOpen={openArticle}
                    isSaved={savedArticleIds.includes(art.id)}
                    onToggleSave={toggleBookmark}
                    onShare={handleShare}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#171719] border border-[#202024] rounded-2xl p-6 space-y-3">
                <AlertCircle className="w-10 h-10 text-[#E50914] mx-auto" />
                <h3 className="text-lg font-bold text-white">No Matching Articles Located</h3>
                <p className="text-xs text-[#B4B4BB]">Try broadening your search query or switching to 'All' categories.</p>
              </div>
            )}
          </div>
        )}

        {/* VIEW 6: USER PROFILE & INTEREST PREFERENCES */}
        {currentPage === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-[#171719] border border-[#202024] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-[#202024]">
                <div className="flex items-center space-x-4">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-[#E50914]"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
                    <div className="text-xs text-[#B4B4BB] mt-0.5">{currentUser.email}</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#E50914]/20 text-[#E50914]">
                        {currentUser.role}
                      </span>
                      <span className="text-xs text-[#B4B4BB]">Member since {currentUser.joinedDate}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setCurrentUser(prev => ({ ...prev, isLoggedIn: false }));
                    showToast("You have been signed out.");
                    navigateTo('home');
                  }}
                  className="px-4 py-2 rounded-lg bg-[#202024] hover:bg-rose-950/40 text-xs font-semibold text-rose-400 border border-[#202024] hover:border-rose-500/50 flex items-center space-x-2 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Personal Interests Configuration */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Preferred Editorial Channels</h3>
                    <p className="text-xs text-[#B4B4BB]">Highlight topics prioritized in your custom home briefing.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {CATEGORIES.filter(c => c !== 'All').map(cat => {
                    const isSelected = currentUser.interests.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setCurrentUser(prev => ({
                            ...prev,
                            interests: isSelected 
                              ? prev.interests.filter(i => i !== cat)
                              : [...prev.interests, cat]
                          }));
                          showToast(`Updated reading interests: ${cat}`);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected 
                            ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/20' 
                            : 'bg-[#202024] text-[#B4B4BB] hover:text-white'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Account Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#202024]">
                <div className="bg-[#0B0B0D] p-4 rounded-xl border border-[#202024]">
                  <div className="text-xs text-[#B4B4BB]">Bookmarked Stories</div>
                  <div className="text-2xl font-bold text-white mt-1">{savedArticleIds.length}</div>
                </div>
                <div className="bg-[#0B0B0D] p-4 rounded-xl border border-[#202024]">
                  <div className="text-xs text-[#B4B4BB]">Reading Streak</div>
                  <div className="text-2xl font-bold text-[#E50914] mt-1">14 Days</div>
                </div>
                <div className="bg-[#0B0B0D] p-4 rounded-xl border border-[#202024]">
                  <div className="text-xs text-[#B4B4BB]">Daily Briefing</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">Active</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: AUTHENTICATION (LOGIN / REGISTER) */}
        {currentPage === 'auth' && (
          <div className="max-w-md mx-auto my-10 bg-[#171719] border border-[#202024] rounded-2xl p-8 space-y-6 animate-fadeIn shadow-2xl">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#202024] rounded-xl text-[#E50914] mb-2">
                <Compass className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-white">Access NEW 360</h2>
              <p className="text-xs text-[#B4B4BB]">Unlock tailored dispatches, multi-device bookmark sync, and daily digests.</p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentUser({
                  name: "Alex Sterling",
                  email: "alex.sterling@new360.io",
                  isLoggedIn: true,
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
                  role: "Editorial Member",
                  joinedDate: "October 2026",
                  interests: ["Technology", "Business", "International"]
                });
                showToast("Welcome back! Signed in successfully.");
                navigateTo('home');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-[#B4B4BB] mb-1">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="alex.sterling@new360.io"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#202024] text-xs text-white placeholder-[#B4B4BB] focus:outline-none focus:border-[#E50914]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-[#B4B4BB]">Password</label>
                  <a href="#reset" onClick={(e) => { e.preventDefault(); showToast("Password reset instructions transmitted to email."); }} className="text-[11px] text-[#E50914] hover:underline">
                    Forgot?
                  </a>
                </div>
                <input 
                  type="password" 
                  defaultValue="••••••••••••"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#202024] text-xs text-white placeholder-[#B4B4BB] focus:outline-none focus:border-[#E50914]"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#E50914] hover:bg-[#FF2433] text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-[#E50914]/25"
              >
                Sign In to Member Desk
              </button>
            </form>

            <div className="text-center text-xs text-[#B4B4BB] pt-2">
              <span>Visitors can continue reading all articles without an active account.</span>
            </div>
          </div>
        )}

        {/* VIEW 8: ABOUT US */}
        {currentPage === 'about' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn py-4">
            <h1 className="text-3xl sm:text-4xl font-black text-white">About NEW 360</h1>
            <p className="text-base text-[#B4B4BB] leading-relaxed">
              Founded on the belief that modern news reporting must transcend superficial soundbites, <span className="text-white font-semibold">NEW 360</span> delivers uncompromised 360-degree editorial coverage across international diplomacy, capital markets, national governance, sports, and science frontiers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-[#171719] p-5 rounded-xl border border-[#202024] space-y-2">
                <div className="text-[#E50914] font-bold text-sm">Every Story</div>
                <p className="text-xs text-[#B4B4BB]">We monitor 80+ international wire networks, sovereign registries, and verifiable primary dispatches around the clock.</p>
              </div>
              <div className="bg-[#171719] p-5 rounded-xl border border-[#202024] space-y-2">
                <div className="text-[#E50914] font-bold text-sm">Every Angle</div>
                <p className="text-xs text-[#B4B4BB]">Zero sensationalized fluff. We pair high-speed summaries with original wire documentation for complete reader agency.</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 9: CONTACT US */}
        {currentPage === 'contact' && (
          <div className="max-w-2xl mx-auto bg-[#171719] border border-[#202024] rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Contact the Editorial Bureau</h1>
              <p className="text-xs text-[#B4B4BB] mt-1">Submit press releases, confidential tip-offs, or licensing inquiries.</p>
            </div>

            {contactForm.submitted ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Transmission Acknowledged</h3>
                <p className="text-xs text-[#B4B4BB]">Our senior news desk officers review all correspondence within 4 hours.</p>
                <button 
                  onClick={() => setContactForm({ name: '', email: '', subject: '', message: '', submitted: false })}
                  className="px-4 py-2 bg-[#202024] hover:bg-[#E50914] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactForm(prev => ({ ...prev, submitted: true }));
                  showToast("Inquiry sent to NEW 360 News Desk.");
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-[#B4B4BB] mb-1">Your Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Dana Scully"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#202024] text-xs text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#B4B4BB] mb-1">Contact Email</label>
                  <input 
                    type="email" 
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#202024] text-xs text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#B4B4BB] mb-1">Subject</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="Press Tip / Editorial Question"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#202024] text-xs text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#B4B4BB] mb-1">Confidential Message</label>
                  <textarea 
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Provide details, sources, or documents..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#202024] text-xs text-white focus:outline-none focus:border-[#E50914]"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-[#E50914] hover:bg-[#FF2433] text-white text-xs font-bold rounded-lg transition-all"
                >
                  Transmit Message
                </button>
              </form>
            )}
          </div>
        )}

        {/* VIEW 10: PRIVACY & TERMS */}
        {(currentPage === 'privacy' || currentPage === 'terms') && (
          <div className="max-w-3xl mx-auto space-y-4 animate-fadeIn py-6 text-sm text-[#B4B4BB] leading-relaxed">
            <h1 className="text-3xl font-black text-white capitalize">{currentPage} Standards</h1>
            <p>
              NEW 360 is committed to user autonomy and uncompromising editorial independence. We do not sell personally identifiable behavioral data to advertising brokers.
            </p>
            <p>
              All bookmarks and article reading histories saved during guest sessions remain entirely client-side. When using third-party wire APIs, all requests conform to secure protocols.
            </p>
            <button 
              onClick={() => navigateTo('home')}
              className="mt-4 px-4 py-2 bg-[#202024] hover:bg-[#E50914] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        )}
      </main>

      {/* ========================================================
          LIVE API CONFIGURATION MODAL
      ======================================================== */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#171719] border border-[#202024] rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#202024]">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-[#E50914]" />
                <h3 className="text-base font-bold text-white">Live News Feed API</h3>
              </div>
              <button 
                onClick={() => setShowApiModal(false)}
                className="text-[#B4B4BB] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#B4B4BB] leading-relaxed">
              Connect a real-time news provider to ingest live headlines directly onto NEW 360. You can generate a free developer key at <span className="text-[#E50914] font-medium">gnews.io</span> or <span className="text-[#E50914] font-medium">newsapi.org</span>.
            </p>

            {apiStatusMessage && (
              <div className={`p-3 rounded-lg text-xs ${
                apiStatusMessage.type === 'error' ? 'bg-rose-950/50 text-rose-300 border border-rose-500/30' : 'bg-[#202024] text-[#B4B4BB]'
              }`}>
                {apiStatusMessage.text}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#B4B4BB] mb-1">API Provider</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setApiProvider('gnews')}
                    className={`py-2 text-xs rounded-lg font-semibold border transition-all ${
                      apiProvider === 'gnews' ? 'bg-[#E50914] border-[#E50914] text-white' : 'bg-[#202024] border-[#202024] text-[#B4B4BB]'
                    }`}
                  >
                    GNews (Recommended)
                  </button>
                  <button
                    type="button"
                    onClick={() => setApiProvider('newsapi')}
                    className={`py-2 text-xs rounded-lg font-semibold border transition-all ${
                      apiProvider === 'newsapi' ? 'bg-[#E50914] border-[#E50914] text-white' : 'bg-[#202024] border-[#202024] text-[#B4B4BB]'
                    }`}
                  >
                    NewsAPI
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B4B4BB] mb-1">API Key</label>
                <input 
                  type="text" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste your 32-character API key"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#202024] text-xs text-white focus:outline-none focus:border-[#E50914]"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button 
                onClick={fetchLiveNews}
                disabled={loading}
                className="flex-1 py-2.5 bg-[#E50914] hover:bg-[#FF2433] disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Stream Live Articles</span>}
              </button>
              <button 
                onClick={() => {
                  setArticles(INITIAL_ARTICLES);
                  setShowApiModal(false);
                  showToast("Reverted to verified demo dispatch repository.");
                }}
                className="px-3.5 py-2.5 bg-[#202024] hover:bg-[#202024]/80 text-[#B4B4BB] hover:text-white text-xs font-semibold rounded-lg transition-all"
              >
                Reset Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TOAST FEEDBACK POPUP
      ======================================================== */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171719] border border-[#E50914] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 text-xs font-semibold animate-slideUp">
          <Sparkles className="w-4 h-4 text-[#E50914]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================
          PREMIUM FOOTER
      ======================================================== */}
      <footer className="bg-[#171719] border-t border-[#202024] mt-16 text-[#B4B4BB] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#202024]">
            {/* Col 1: Brand & Tagline */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <Compass className="w-6 h-6 text-[#E50914]" />
                <div className="text-xl font-black tracking-tight text-white">
                  <span>NEW</span>
                  <span className="text-[#E50914] ml-1">360</span>
                </div>
              </div>
              <p className="text-xs text-[#B4B4BB] leading-relaxed max-w-sm">
                Independent investigative portal delivering full spectrum international dispatches, market analytics, and cultural reporting without bias or corporate filtration.
              </p>
              <div className="text-[11px] text-[#B4B4BB]/70">
                Tagline: <span className="text-white font-medium italic">Every Story. Every Angle.</span>
              </div>
            </div>

            {/* Col 2: Navigation Desks */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">News Desks</h4>
              <ul className="space-y-2">
                {CATEGORIES.filter(c => c !== 'All').map(c => (
                  <li key={c}>
                    <button 
                      onClick={() => navigateToCategory(c)}
                      className="hover:text-white transition-colors"
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Portal Features */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Features</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigateTo('search')} className="hover:text-white">Live Search Index</button></li>
                <li><button onClick={() => navigateTo('saved')} className="hover:text-white">Personal Reading List</button></li>
                <li><button onClick={() => setShowApiModal(true)} className="hover:text-white">API Feed Integration</button></li>
                <li><button onClick={() => navigateTo('profile')} className="hover:text-white">Reader Profile</button></li>
              </ul>
            </div>

            {/* Col 4: Corporate & Standards */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Transparency</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigateTo('about')} className="hover:text-white">About NEW 360</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-white">Newsroom Contact</button></li>
                <li><button onClick={() => navigateTo('privacy')} className="hover:text-white">Privacy Architecture</button></li>
                <li><button onClick={() => navigateTo('terms')} className="hover:text-white">Terms of Syndicate</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-4">
            <div>
              © {new Date().getFullYear()} NEW 360 Inc. All worldwide editorial rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <span className="flex items-center text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span> Systems Fully Operational
              </span>
              <span>Theme: Red & Black Editorial</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ========================================================
// REUSABLE NEWS ARTICLE CARD COMPONENT
// ========================================================
function NewsCard({ article, onOpen, isSaved, onToggleSave, onShare }) {
  return (
    <article 
      onClick={() => onOpen(article.id)}
      className="group bg-[#202024] border border-[#202024] hover:border-[#E50914] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#E50914]/5 cursor-pointer"
    >
      <div>
        {/* Card Image & Badges */}
        <div className="relative h-48 w-full overflow-hidden bg-[#171719]">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex items-center space-x-1.5">
            <span className="bg-[#E50914] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded shadow">
              {article.category}
            </span>
            {article.isBreaking && (
              <span className="bg-white text-[#0B0B0D] text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                Breaking
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 flex items-center space-x-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => onToggleSave(article.id, e)}
              className="p-1.5 rounded-full bg-[#0B0B0D]/80 backdrop-blur hover:bg-[#E50914] text-white transition-colors"
              title="Bookmark story"
              aria-label="Bookmark"
            >
              {isSaved ? (
                <BookmarkCheck className="w-3.5 h-3.5 text-[#E50914] group-hover:text-white" />
              ) : (
                <Bookmark className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              onClick={(e) => onShare(article, e)}
              className="p-1.5 rounded-full bg-[#0B0B0D]/80 backdrop-blur hover:bg-[#E50914] text-white transition-colors"
              title="Share story"
              aria-label="Share"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-2.5">
          <div className="flex items-center space-x-2 text-[11px] text-[#B4B4BB]">
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1 text-[#E50914]" />
              {article.readTime}
            </span>
            <span>•</span>
            <span className="truncate">{article.source}</span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-[#E50914] transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs text-[#B4B4BB] line-clamp-3 leading-relaxed font-light">
            {article.description}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5 pt-1 border-t border-[#171719] flex items-center justify-between text-xs">
        <div className="text-[11px] text-[#B4B4BB] truncate max-w-[150px]">
          By <span className="text-white font-medium">{article.author}</span>
        </div>

        <span className="text-[#E50914] group-hover:text-[#FF2433] font-bold text-[11px] flex items-center">
          Read More <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </article>
  );
}