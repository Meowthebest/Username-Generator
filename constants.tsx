export const CATEGORY_WORDS: Record<string, string[]> = {
  fruit: [
    'Berry','Peach','Cherry','Mango','Citrus','Melon','Apple','Plum','Kiwi','Grape','Lime','Coco',
    'Papaya','Guava','Lychee','Fig','Pear','Apricot','Pine','Orange','Banana','Nectar','Pomelo',
    'Raspberry','Blueberry','Straw','Yuzu','Dragonfruit','Passion','Cantaloupe','Tangerine',
    'Mandarin','Pomegranate','Mulberry','Cranberry','Goji','Date','Jackfruit','Starfruit'
  ],

  cat: [
    'Tabby','Whiskers','Paws','Meow','Feline','Calico','Luna','Simba','Misty','Shadow','Oliver','Mochi',
    'Nimbus','Beans','Purr','Snowball','Tiger','Ash','Smokey','Nori','Biscuit','Pebble','Mittens',
    'Pumpkin','Salem','Clover','Tofu','Sushi','Button','Marble','Velvet','Pixel','Sprout',
    'Cinnamon','Honey','Latte','Pudding','Waffles','Cloud','Pebbles'
  ],

  anime: [
    'Sakura','Shinobi','Kaiju','Senpai','Chibi','Hokage','Manga','Akira','Zen','Ronin','Kage','Neko',
    'Yami','Hoshi','Kitsune','Otaku','Sensei','Shiro','Kuro','Raiden','Ikari','Sora','Tenshi',
    'Kami','Ryu','Aoi','Hina','Miko','Kohana','Arashi','Tsuki','Yuki','Hajime','Izanami',
    'Izanagi','Amaterasu','Susanoo'
  ],

  league: [
    'Nexus','Ward','Penta','Gank','Baron','Drake','Mid','Solo','Carry','Flash','Inhib','Jungle',
    'Summoner','Minion','Rift','Elder','Void','Toplane','Botlane','Smite','Recall','Crit',
    'Snowball','Macro','Micro','Skillshot','Cooldown','Lethal','Execute','Splitpush',
    'Outplay','Clutch','Pentakill','Ace','Waveclear'
  ],

  genshin: [
    'Paimon','Mora','Resin','Teyvat','Vision','Archon','Anemo','Geo','Electro','Dendro','Hydro','Pyro',
    'Adeptus','Celestia','Primogem','Leyline','Fatui','Harbinger','Traveler','Domain','Burst',
    'Constellation','Artifact','Abyss','Stella','Comet','Gnosis','Fate','Wish','Banner',
    'Ascension','Talent','Catalyst','Polearm','Sword'
  ],

  sanrio: [
    'Kitty','Melody','Cinna','Kuromi','Pompom','Keroppi','Badtz','Gudetama','Lala','Kiki','Pochacco',
    'Tuxedo','Charmmy','Milk','BerryBear','Maron','WishMe','Sugarbunny','TinyStar',
    'Cloudy','Dreamy','Softie','Sweetie','Fluffy','Sparkle','Pastel','Ribbon',
    'Bubble','Honeybun','Cotton','Marshmallow'
  ],

  clean: [
    'Swift','Silent','Echo','Frost','Lunar','Solar','Void','Nova','Pulse','Aura','Zenith','Flux',
    'Pure','Clear','Calm','Sharp','Focus','Prime','Vector','Orbit','Signal','Core','Halo',
    'Alpha','Beta','Vertex','Linear','Minimal','Neutral','Mono','Crisp','Still','Balance',
    'Edge','Point','Axis'
  ],

  miscellaneous: [
    'Spark','Glitch','Neon','Wave','Pixel','Cloud','Spirit','Vibe','Charm','Glow','Mist','Drift',
    'Orbit','Static','Dream','Cosmic','Bloom','Phantom','Ripple','Arc','Fade','Motion',
    'Breeze','Ember','Twilight','Echoes','Pulse','Horizon','Lumen','Novae',
    'Mirage','Signal','Fluxion','Afterglow'
  ]
};

export const PREFIXES = [
  'The','Little','Big','Super','Mega','Hyper','Ultra','Neon','Dark','Golden','Icy','Fire',
  'Soft','Tiny','Cosmic','Cyber','Lucky','Hidden','Pure','Lazy','Silent','Midnight',
  'Crystal','Electric','Frosty','Sunny','Gentle'
];

export const SUFFIXES = [
  'Zone','Labs','Hub','HQ','Pro','Elite','Master','Lord','King','Queen','Star','Moon',
  'Core','X','Prime','Plus','Nova','Void','Wave','Verse','Realm','Craft',
  'Point','Base','Nest','Club','World'
];

export const AMBIGUOUS_CHARS = ['l','1','I','O','0','S','5','Z','2'];

export const STYLE_CONFIGS = {
  cute: { separator: '', casing: 'pascal', numbers: false },
  clean: { separator: '', casing: 'camel', numbers: false },
  gamer: { separator: '_', casing: 'upper', numbers: true },
  professional: { separator: '.', casing: 'pascal', numbers: false }
};
