import fetch from "node-fetch";

export default async function handler(req, res) {
  const username = "cleytonfilipe";

  // 🔥 dados reais
  const user = await fetch(`https://api.github.com/users/${username}`).then(r => r.json());
  const repos = user.public_repos ?? 0;
  const followers = user.followers ?? 0;

  // commits aproximados (eventos recentes)
  const events = await fetch(`https://api.github.com/users/${username}/events`).then(r => r.json());
  const commits = Array.isArray(events)
    ? events.filter(e => e.type === "PushEvent")
        .reduce((acc, e) => acc + (e.payload?.commits?.length || 0), 0)
    : 0;

  const svg = `
<svg width="1000" height="720" xmlns="http://www.w3.org/2000/svg">

<style>
@keyframes fade { to { opacity: 1; } }
.line { opacity: 0; animation: fade 0.4s forwards; }
.cursor { animation: blink 1s infinite; }
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
</style>

<rect width="100%" height="100%" fill="#0d1117"/>

<!-- ASCII (100% INTACTO) -->
<text x="20" y="30" fill="#c9d1d9" font-family="Courier New, monospace" font-size="11">
<tspan x="20" dy="0">@@@@@@@@@@@@@@%#%%%%%#*+***#*##%%#*@@@@@@@@@@@@@@@@</tspan>
<tspan x="20" dy="14">@@@@@@@@@@@@+*%%%##*++**++++++*##%%*+#@@@@@@@@@@@@@</tspan>
<tspan x="20" dy="14">@@@@@@@@@%+=+##*+++*#%@@@%%#%%#*+++*#++*@@@@@@@@@@@</tspan>
<tspan x="20" dy="14">@@@@@@@@+===*+=+*%@@@@@@@@%%%@@@@@@+++==+#@@@@@@@@@</tspan>
<tspan x="20" dy="14">@@@@@@%==+@%**%%@@@@@@@@@@@@@@@@@@@@%#@*==*@@@@@@@@</tspan>
<tspan x="20" dy="14">@@@@@%==#@@%#@@%%%%%%@@@@@@@@@@@@@@@@@@@@*=*@@@@@@@</tspan>
<tspan x="20" dy="14">@@@@#+*@@@@#%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@*=%@@@@@@</tspan>
<tspan x="20" dy="14">@@@@=+@@@@@#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@++@@@@@@</tspan>
<tspan x="20" dy="14">@@@*=%@@@@@%#@%**+++*#%@@@@@%#*+++*#@@@@@@@@+@@@@@@</tspan>
<tspan x="20" dy="14">@@@+#@@@@@@%%######*++*###***++*#%%%@@@%%@@@@%@@@@@</tspan>
<tspan x="20" dy="14">@@@+@@#+===##***#%%#*++*#%#*+**#%%%%%%@==++#%@@@@@@</tspan>
<tspan x="20" dy="14">@@@++=====-***+==++*****%%%#+***+++*%%@==++*#@@@@@@</tspan>
<tspan x="20" dy="14">@@@*=+++==-*###*#####**#%@@@%#%%###%@@@====+*%@@@@@</tspan>
<tspan x="20" dy="14">@@@+=+*===-#@@%%@@@%##%@@@@@@@%%@@@@@@@+===+*%%=++@</tspan>
<tspan x="20" dy="14">@@@+==*+==-#@%%%@%%#*#**###**#%#%%%@@@@+===+*@*---@</tspan>
<tspan x="20" dy="14">@@@#==++==-*####**##****#****#%%####%@@+==+=*@+---@</tspan>
<tspan x="20" dy="14">@@@@===+=--****+***++**##%########**#%@=-===##----%</tspan>
<tspan x="20" dy="14">@@@@#====--+***#+=+++***##**#####++##%@=---=*-----%</tspan>
<tspan x="20" dy="14">@@@@@@=----=**#**#*++%@@@@@@@@*-=+####%----------=+</tspan>
<tspan x="20" dy="14">@@@@@@@%-===*****###*##%@@@%%%%%######+----------=*</tspan>
<tspan x="20" dy="14">@@@@@@@@+@@@@#****##*********#%%###**+-----------=*</tspan>
<tspan x="20" dy="14">@@@@@@@@*@@@%*+++**###%%%%%%#%%%##***=----------==*</tspan>
<tspan x="20" dy="14">@@@@@@@@#@@%++++++*##%%@@@@@@@@@%#+*#+------------*</tspan>
<tspan x="20" dy="14">@@@@@@@@@#*****++==+*#%%@@%%%%%#++*##*------------=</tspan>
<tspan x="20" dy="14">@@@@@@@@#*+++==-===-=+**##***+==++**#%%#**+=------=</tspan>
<tspan x="20" dy="14">@@@@@%*+++=------=++==-------=+++***##%%####%%%@@%#</tspan>
<tspan x="20" dy="14">@@%*+++++++===--=+++++++==++++++*****##############</tspan>
<tspan x="20" dy="14">#+======+*@@@@%*+++++++++++++++******##%%%######***</tspan>
<tspan x="20" dy="14">=====*@@@@@@@@%*+++++++=++++++++*****##%%######***#</tspan>
</text>

<!-- TERMINAL -->
<text x="460" y="40" fill="#58a6ff" font-family="Courier New, monospace" font-size="14" class="line" style="animation-delay:0.5s">
cleyton@github:~$
</text>

<text x="460" y="80" fill="#c9d1d9" font-family="Courier New, monospace" font-size="14" class="line" style="animation-delay:1s">
&gt; whoami
</text>

<text x="460" y="105" fill="#3fb950" font-family="Courier New, monospace" font-size="14" class="line" style="animation-delay:1.4s">
Cleyton Filipe
</text>

<text x="460" y="130" fill="#c9d1d9" font-family="Courier New, monospace" font-size="14" class="line" style="animation-delay:1.8s">
Back-end Developer | Java | APIs
</text>

<text x="460" y="180" fill="#c9d1d9" font-family="Courier New, monospace" font-size="14" class="line" style="animation-delay:2.4s">
&gt; stats
</text>

<text x="460" y="205" fill="#c9d1d9" font-family="Courier New, monospace" font-size="14" class="line" style="animation-delay:2.8s">
Repos..........${repos}
</text>

<text x="460" y="230" fill="#c9d1d9" font-family="Courier New, monospace" font-size="14" class="line" style="animation-delay:3.1s">
Followers......${followers}
</text>

<text x="460" y="255" fill="#c9d1d9" font-family="Courier New, monospace" font-size="14" class="line" style="animation-delay:3.4s">
Commits........${commits}
</text>

<text x="460" y="300" fill="#c9d1d9" font-family="Courier New, monospace" font-size="14" class="cursor line" style="animation-delay:4s">
█
</text>

</svg>
`;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
  res.send(svg);
}