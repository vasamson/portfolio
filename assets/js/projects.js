/* ==========================================================================
   Données des projets — source unique pour la grille d'accueil
   et pour la page projet (projet.html?id=...).
   - category : social | ecommerce | web | design | photo | marketing
   - event    : true pour les projets événementiels (filtre « Événementiel »)
   - cover    : visuel de la carte (sans visuel : couverture générée via "hue")
   - cardCover: visuel alternatif pour la carte uniquement (ex. affiche verticale)
   - role     : liste « Ce que j'ai fait » (HTML autorisé)
   - stats    : chiffres clés
   - chapters : sections. Soit "image", soit "images" (galerie),
                soit "video" (+ "poster", "vertical"). "poster: true" = visuels verticaux.
   - outcome  : conclusion « Ce que j'en retiens »
   - credits  : mention de source en bas de page
   ========================================================================== */

const IMG = "assets/img/projets/";
const VID = "assets/video/";

const PROJECTS = [
    {
        id: "faun-tour-femmes",
        title: "J'ai créé les supports du Faun Tour Femmes 2026",
        cardTitle: "Faun Tour Femmes 2026",
        category: "design",
        event: true,
        categoryLabel: "Identité visuelle & print",
        year: "2026",
        summary: "Affiche, maillots distinctifs, catalogue d'hospitalités, mémento des signaleurs et visuels presse pour une course féminine internationale.",
        tagline: "Pour le Faun Tour Femmes (10 au 13 septembre 2026), j'ai conçu la majorité des supports de communication de l'épreuve.",
        intro: "Le Faun Tour Femmes est une course féminine internationale de quatre jours en Drôme-Ardèche. J'ai créé son <span class='text-highlight'>affiche</span>, ses <span class='text-highlight'>maillots distinctifs</span> et leurs cadres, le <span class='text-highlight'>catalogue d'hospitalités</span> pour les partenaires, le mémento des signaleurs, le guide technique et les visuels presse.",
        tools: ["Illustrator", "Photoshop", "InDesign", "Rendus 3D"],
        cover: IMG + "faun-tour-femmes/affiche.webp",
        cardCover: IMG + "faun-tour-femmes/course.jpg",
        cardCoverAlt: "Une coureuse dans un virage du Faun Tour Femmes, à 25 km de l'arrivée, suivie par la moto caméra",
        coverAlt: "Affiche du Faun Tour Femmes 2026",
        coverPos: "50% 40%",
        showCover: false,
        role: [
            "J'ai illustré et mis en page l'<strong>affiche</strong>, en A3 et en grand format MUPI.",
            "J'ai dessiné les <strong>trois maillots distinctifs</strong> et leurs cadres de podium.",
            "J'ai conçu le <strong>catalogue d'hospitalités</strong> et la présentation des équipes engagées.",
            "J'ai mis en page le <strong>mémento des signaleurs</strong> et le <strong>guide technique</strong>.",
            "J'ai créé les <strong>visuels presse</strong> et les bandeaux partenaires."
        ],
        stats: [
            { value: "4", label: "jours de course" },
            { value: "476,5 km", label: "de parcours, 7 745 m D+" },
            { value: "~100", label: "coureuses de 15 nationalités" },
            { value: "420 min", label: "de direct télé" }
        ],
        chapters: [
            {
                title: "J'ai créé l'affiche",
                html: "J'ai voulu une illustration <span class='text-highlight'>lumineuse</span> des paysages de la Drôme et de l'Ardèche, avec le parcours des étapes intégré. Je l'ai déclinée en A3 et en grand format pour l'affichage urbain.",
                images: [
                    { src: IMG + "faun-tour-femmes/affiche.webp", alt: "Affiche A3 du Faun Tour Femmes" },
                    { src: IMG + "faun-tour-femmes/affiche-mupi.webp", alt: "Affiche grand format MUPI" }
                ],
                poster: true
            },
            {
                title: "J'ai dessiné les maillots distinctifs",
                html: "Trois maillots aux couleurs de leurs partenaires (leader, grimpeuse, jeune), puis des <span class='text-highlight'>cadres de présentation</span> pour les podiums et les réseaux.",
                images: [
                    { src: IMG + "faun-tour-femmes/maillot-leader.webp", alt: "Maillot jaune de leader" },
                    { src: IMG + "faun-tour-femmes/maillot-grimpeur.webp", alt: "Maillot à pois de la meilleure grimpeuse" },
                    { src: IMG + "faun-tour-femmes/maillot-jeune.webp", alt: "Maillot blanc de la meilleure jeune" },
                    { src: IMG + "faun-tour-femmes/maillots-cadres.webp", alt: "Cadres de présentation des maillots" }
                ]
            },
            {
                title: "J'ai conçu les documents de l'organisation",
                html: "Catalogue d'hospitalités pour les partenaires, présentation des équipes engagées et guide technique : des documents lisibles, dans la charte de l'épreuve.",
                images: [
                    { src: IMG + "faun-tour-femmes/hospitalites.webp", alt: "Catalogue des hospitalités" },
                    { src: IMG + "faun-tour-femmes/equipes.webp", alt: "Équipes engagées" },
                    { src: IMG + "faun-tour-femmes/guide.webp", alt: "Guide technique" }
                ],
                poster: true
            },
            {
                title: "J'ai mis en page le mémento des signaleurs",
                html: "Les signaleurs bénévoles assurent la sécurité de la course : j'ai résumé leurs consignes en un <span class='text-highlight'>dépliant clair</span>, avec les bons réflexes illustrés.",
                image: IMG + "faun-tour-femmes/memento.webp",
                alt: "Mémento du signaleur"
            },
            {
                title: "J'ai produit les visuels presse et partenaires",
                html: "Visuel de chiffres clés pour la presse régionale, frise du calendrier des courses et bandeaux partenaires.",
                images: [
                    { src: IMG + "faun-tour-femmes/chiffres.webp", alt: "Visuel presse des chiffres clés" },
                    { src: IMG + "faun-tour-femmes/frise.webp", alt: "Frise des courses 2026" },
                    { src: IMG + "faun-tour-femmes/partenaires.webp", alt: "Bandeau des partenaires" },
                    { src: IMG + "faun-tour-femmes/arche.webp", alt: "Arche d'arrivée habillée" }
                ]
            }
        ],
        outcome: "Ce projet m'a appris à concevoir pour des publics très différents dans une même charte : le grand public avec l'affiche, les partenaires avec le catalogue, les bénévoles avec le mémento."
    },
    {
        id: "championnat-cyclisme",
        title: "J'ai couvert les Championnats d'Europe de cyclisme 2025",
        cardTitle: "Championnats d'Europe de cyclisme 2025",
        category: "social",
        event: true,
        categoryLabel: "Social media & production",
        year: "2025",
        summary: "Quatre jours de couverture live et de production photo au cœur de l'élite européenne, en Drôme-Ardèche.",
        tagline: "En octobre 2025, j'ai couvert les Championnats d'Europe UEC sur route en Drôme-Ardèche : photos, contenus en direct et coulisses des partenaires.",
        intro: "Intervenir sur un événement international comme les <span class='text-highlight'>Championnats d'Europe UEC</span>, c'est un défi de <span class='text-highlight'>réactivité</span>. Pendant quatre jours, j'ai photographié les contre-la-montre, le relais mixte, les courses en ligne et les podiums, puis j'ai produit des contenus pour les réseaux en quelques minutes. J'ai aussi raconté les coulisses des équipementiers de l'Équipe de France.",
        tools: ["Photographie", "Stratégie social media", "Community management live", "Photoshop"],
        cover: IMG + "championnat-europe/podium-elite.webp",
        coverAlt: "Podium des Championnats d'Europe UEC 2025",
        showCover: false,
        role: [
            "J'ai photographié <strong>quatre jours de compétition</strong> : contre-la-montre, relais mixte, courses en ligne et podiums.",
            "J'ai trié, retouché et publié les images <strong>dans la foulée des arrivées</strong>.",
            "J'ai produit des contenus dédiés aux <strong>partenaires textiles</strong> de l'Équipe de France (Alé).",
            "J'ai documenté la <strong>visite de l'atelier Eldera</strong>, où sont fabriquées les tenues."
        ],
        stats: [
            { value: "800", label: "athlètes au départ" },
            { value: "45", label: "nations représentées" },
            { value: "4", label: "jours de compétition couverts" },
            { value: "1 000+", label: "photos produites" }
        ],
        chapters: [
            {
                title: "J'ai planté le décor",
                html: "La Drôme et l'Ardèche ont accueilli l'élite européenne en <span class='text-highlight'>octobre 2025</span>. J'ai cherché des points de vue qui montrent à la fois la course et le territoire : relief, vignes et vallées.",
                image: IMG + "championnat-europe/panorama.webp",
                alt: "Panorama sur la vallée depuis le parcours"
            },
            {
                title: "J'ai capté l'émotion des podiums",
                html: "Chaque podium devait être en ligne en quelques minutes : j'ai retouché les photos à la volée, rédigé les légendes et identifié les <span class='text-highlight'>partenaires officiels</span>.",
                images: [
                    { src: IMG + "championnat-europe/podium-elite.webp", alt: "Podium d'une course en ligne" },
                    { src: IMG + "championnat-europe/podium-relais.webp", alt: "Podium du relais mixte" },
                    { src: IMG + "championnat-europe/equipe-france.webp", alt: "L'Équipe de France sur le podium" }
                ]
            },
            {
                title: "J'ai suivi la course au plus près",
                html: "Des aires de départ aux pentes les plus raides, j'ai produit des <span class='text-highlight'>photos HD</span> et des vidéos courtes pour plonger les fans au cœur du peloton.",
                images: [
                    { src: IMG + "championnat-europe/clm-equipe.webp", alt: "Départ du contre-la-montre par équipes" },
                    { src: IMG + "championnat-europe/depart-clm.webp", alt: "Coureurs de l'Équipe de France au départ" },
                    { src: IMG + "championnat-europe/montee.webp", alt: "Coureurs dans une montée" }
                ]
            },
            {
                title: "J'ai mis en avant le maillot de champion d'Europe",
                html: "Pour <span class='text-highlight'>Alé</span>, équipementier du maillot de champion d'Europe, j'ai suivi la remise et la signature du maillot par le vainqueur.",
                images: [
                    { src: IMG + "championnat-europe/signature.webp", alt: "Le champion d'Europe signe son maillot" },
                    { src: IMG + "championnat-europe/maillot-champion.webp", alt: "Maillot de champion d'Europe signé" }
                ]
            },
            {
                title: "J'ai raconté les coulisses",
                html: "J'ai accompagné la visite de l'atelier <span class='text-highlight'>Eldera</span>, qui fabrique les tenues : machines à broder, stocks et échanges avec les équipes.",
                images: [
                    { src: IMG + "championnat-europe/eldera.webp", alt: "Machines à broder dans l'atelier Eldera" },
                    { src: IMG + "championnat-europe/atelier-stock.webp", alt: "Stock de tenues à l'atelier" }
                ]
            }
        ],
        links: [
            { label: "Voir l'Instagram officiel", url: "https://www.instagram.com/2025uec_road/" }
        ],
        outcome: "J'ai appris à travailler vite et proprement sur un événement international : anticiper les placements, trier en quelques minutes et penser chaque photo pour un usage précis (résultat, partenaire, émotion)."
    },
    {
        id: "boucles-drome-ardeche",
        title: "J'ai proposé la stratégie de contenu des Boucles Drôme Ardèche 2026",
        cardTitle: "Boucles Drôme Ardèche 2026",
        category: "social",
        event: true,
        categoryLabel: "Stratégie de contenu & print",
        year: "2026",
        summary: "Calendrier éditorial pour une course UCI ProSeries, supports de podium et images en caméra embarquée.",
        tagline: "J'ai présenté une stratégie de community management aux Boucles Drôme Ardèche (UCI ProSeries), puis j'ai réalisé des supports pour l'édition 2026.",
        intro: "En novembre 2025, j'ai présenté aux organisateurs une <span class='text-highlight'>proposition de contenu</span> complète : un calendrier éditorial jour par jour de décembre à la course (partenaires, équipes engagées, parcours, offres VIP, montées mythiques, comptes à rebours). J'ai ensuite réalisé des <span class='text-highlight'>supports de course</span> (backdrop de podium, casquettes, marches) et filmé en caméra embarquée.",
        tools: ["Calendrier éditorial", "Illustrator", "InDesign", "PowerPoint", "Caméra embarquée"],
        cover: IMG + "boucles-drome-ardeche/backdrop.webp",
        cardCover: IMG + "boucles-drome-ardeche/montee.jpg",
        cardCoverAlt: "Coureurs dans la dernière montée des Boucles Drôme Ardèche, entre amandiers en fleurs et public massé derrière les barrières",
        coverAlt: "Backdrop de podium des Boucles Drôme Ardèche 2026",
        showCover: false,
        role: [
            "J'ai rédigé et présenté une <strong>proposition de community management</strong> aux organisateurs.",
            "J'ai construit un <strong>calendrier éditorial</strong> jour par jour jusqu'à la course.",
            "J'ai créé les <strong>supports de podium</strong> : backdrop, marches, casquettes.",
            "J'ai tourné des images en <strong>caméra embarquée</strong> le jour de course."
        ],
        chapters: [
            {
                title: "J'ai présenté une stratégie",
                html: "J'ai structuré ma proposition autour d'objectifs clairs, puis d'un <span class='text-highlight'>calendrier mois par mois</span> : un thème par jour, des rendez-vous partenaires réguliers et une montée en puissance jusqu'à la course (28 février – 1ᵉʳ mars 2026).",
                images: [
                    { src: IMG + "boucles-drome-ardeche/proposition.webp", alt: "Couverture de la proposition de contenu" },
                    { src: IMG + "boucles-drome-ardeche/calendrier.webp", alt: "Calendrier éditorial de décembre 2025" }
                ]
            },
            {
                title: "J'ai habillé le podium",
                html: "Backdrop aux couleurs des partenaires, habillage latéral, marches du podium, casquettes : j'ai produit les fichiers d'impression grand format.",
                images: [
                    { src: IMG + "boucles-drome-ardeche/backdrop.webp", alt: "Backdrop de podium" },
                    { src: IMG + "boucles-drome-ardeche/cote.webp", alt: "Habillage latéral du podium" },
                    { src: IMG + "boucles-drome-ardeche/marche.webp", alt: "Habillage des marches" },
                    { src: IMG + "boucles-drome-ardeche/casquette.webp", alt: "Visuel de casquette" }
                ]
            },
            {
                title: "J'ai filmé en caméra embarquée",
                html: "Le jour de course, j'ai tourné des images au plus près des coureurs pour les réseaux.",
                video: VID + "bda-embarque.mp4",
                poster: VID + "bda-embarque.webp",
                vertical: true,
                alt: "Images en caméra embarquée le jour de course"
            },
            {
                title: "Le résultat sur le terrain",
                html: "Podiums, soirée de présentation et remerciements aux partenaires : les supports ont accompagné toute l'édition.",
                images: [
                    { src: IMG + "boucles-drome-ardeche/podium.webp", alt: "Podium devant le backdrop" },
                    { src: IMG + "boucles-drome-ardeche/course-1.webp", alt: "Vainqueur levant les bras" },
                    { src: IMG + "boucles-drome-ardeche/course-2.webp", alt: "Coureurs dans une montée" },
                    { src: IMG + "boucles-drome-ardeche/presentation.webp", alt: "Soirée de présentation de l'édition" },
                    { src: IMG + "boucles-drome-ardeche/merci.webp", alt: "Slide de remerciements aux partenaires" }
                ]
            }
        ],
        outcome: "Présenter une stratégie à un organisateur m'a appris à défendre mes idées avec un document clair et un calendrier concret, plutôt qu'avec des intentions."
    },
    {
        id: "ardechoise",
        title: "J'ai piloté les réseaux sociaux de L'Ardéchoise 2026",
        cardTitle: "L'Ardéchoise 2026",
        category: "social",
        event: true,
        categoryLabel: "Social media & création",
        year: "2026",
        featured: true,
        summary: "Huit mois de community management pour l'une des plus grandes cyclosportives d'Europe : +30 % d'abonnés Instagram et 2,2 millions de vues Facebook.",
        tagline: "D'octobre 2025 à juin 2026, j'ai conçu et animé toute la communication Instagram et Facebook de L'Ardéchoise : des ouvertures d'inscriptions jusqu'au dernier coup de pédale.",
        intro: "L'Ardéchoise rassemble chaque année des milliers de cyclistes sur les routes de l'Ardèche et de la Drôme. On m'a confié ses réseaux sociaux pour toute la saison 2026. J'ai construit une <span class='text-highlight'>stratégie en trois temps</span> : avant l'événement pour générer des inscriptions, pendant pour le faire vivre en direct, après pour fidéliser la communauté. J'ai créé moi-même l'ensemble des visuels, rédigé les publications, tourné et monté les vidéos, puis livré un <span class='text-highlight'>bilan chiffré</span> à l'organisation.",
        tools: ["Stratégie social media", "Photoshop", "Illustrator", "Premiere Pro", "Meta Business Suite"],
        cover: IMG + "ardechoise/banniere.webp",
        cardCover: IMG + "ardechoise/village.jpg",
        cardCoverAlt: "Une cycliste de L'Ardéchoise salue les bénévoles déguisés en reine d'Angleterre et en gardes royaux dans un village animé",
        coverAlt: "Bannière de L'Ardéchoise 2026, 9 au 13 juin",
        showCover: true,
        role: [
            "J'ai bâti le <strong>calendrier éditorial</strong> sur huit mois, avec un objectif par période : inscriptions, attente, direct, fidélisation.",
            "J'ai conçu <strong>plus de 50 publications</strong> : affiches, carrousels, comptes à rebours, annonces partenaires, jeux concours.",
            "J'ai créé une <strong>charte graphique sociale</strong> (violet, jaune, typographies, gabarits de stories) réutilisable d'une année sur l'autre.",
            "J'ai couvert l'événement <strong>en direct pendant cinq jours</strong> : 83 stories, des Reels quotidiens et des photos sur le terrain.",
            "J'ai analysé les statistiques et rédigé le <strong>bilan de mission</strong> remis à l'organisation."
        ],
        stats: [
            { value: "+30 %", label: "d'abonnés Instagram (de 3 870 à 5 050)" },
            { value: "2,2 M", label: "de vues Facebook de mars à juin" },
            { value: "364 k", label: "de vues Instagram de mars à juin" },
            { value: "83", label: "stories pendant les 5 jours de course" }
        ],
        chapters: [
            {
                title: "J'ai lancé la saison",
                html: "Dès décembre, j'ai annoncé l'<span class='text-highlight'>ouverture des inscriptions</span> et présenté la nouvelle affiche. J'ai mis en avant les premiers partenaires, comme la location de vélos sur place, pour lever les freins à l'inscription.",
                images: [
                    { src: IMG + "ardechoise/ouverture.webp", alt: "Visuel : inscriptions ouvertes" },
                    { src: IMG + "ardechoise/affiche-presentation.webp", alt: "Présentation de l'affiche 2026" },
                    { src: IMG + "ardechoise/location-velo.webp", alt: "Visuel partenaire : louez votre vélo" }
                ]
            },
            {
                title: "J'ai transformé chaque palier en événement",
                html: "Plutôt que de rappeler sans cesse de s'inscrire, j'ai fait des <span class='text-highlight'>paliers d'inscrits</span> (2 000, 4 000, 5 000, 7 000 puis 10 000) des moments à célébrer. Chaque visuel reprend une vraie photo de l'événement, pour que la communauté se reconnaisse et ait envie de rejoindre le peloton.",
                images: [
                    { src: IMG + "ardechoise/inscrits-5000.webp", alt: "Visuel : déjà plus de 5 000 inscrits" },
                    { src: IMG + "ardechoise/inscrits-7000.webp", alt: "Visuel : déjà plus de 7 000 inscrits" },
                    { src: IMG + "ardechoise/inscrits-10000.webp", alt: "Visuel : déjà plus de 10 000 inscrits" }
                ]
            },
            {
                title: "J'ai créé de l'attente",
                html: "Comptes à rebours J-50 et J-30, offre <span class='text-highlight'>village VIP</span>, appel aux bénévoles, challenge « Triple Plateau », pack nutrition, Ardèche Gravel, meilleur prix : chaque format avait un rôle précis dans le calendrier, avec une identité violette et jaune que j'ai déclinée sur tous les supports.",
                images: [
                    { src: IMG + "ardechoise/j-50.webp", alt: "Compte à rebours J-50" },
                    { src: IMG + "ardechoise/vip.webp", alt: "Visuel : vivez L'Ardéchoise en VIP" },
                    { src: IMG + "ardechoise/benevoles.webp", alt: "Visuel : rejoignez les plus de 6 000 bénévoles" },
                    { src: IMG + "ardechoise/j-30.webp", alt: "Compte à rebours J-30" },
                    { src: IMG + "ardechoise/meilleur-prix.webp", alt: "Visuel : profitez du meilleur prix" },
                    { src: IMG + "ardechoise/ardeche-gravel.webp", alt: "Visuel Ardèche Gravel" },
                    { src: IMG + "ardechoise/pack-nutrition.webp", alt: "Offre pack nutrition" },
                    { src: IMG + "ardechoise/relance.webp", alt: "Relance des inscriptions : rejoins l'aventure" },
                    { src: IMG + "ardechoise/challenge.webp", alt: "Logo du challenge Triple Plateau" }
                ]
            },
            {
                title: "J'ai valorisé les partenaires",
                html: "Les partenaires financent l'événement : je leur ai réservé des <span class='text-highlight'>annonces dédiées</span>, construites sur le même gabarit pour rester cohérent avec le feed tout en mettant leur logo en avant.",
                images: [
                    { src: IMG + "ardechoise/partenaire-ca.webp", alt: "Annonce partenaire Crédit Agricole" },
                    { src: IMG + "ardechoise/partenaire-arche.webp", alt: "Annonce partenaire Arche Agglo" },
                    { src: IMG + "ardechoise/bons-reflexes.webp", alt: "Story : les bons réflexes" }
                ]
            },
            {
                title: "J'ai mis en avant la capsule officielle",
                html: "J'ai réalisé les visuels de lancement de la <span class='text-highlight'>collection capsule 2026</span> (maillots Châtaigne et Genêt) pour pousser la précommande sur les réseaux et la boutique en ligne.",
                images: [
                    { src: IMG + "ardechoise/capsule.webp", alt: "Visuel de la collection capsule officielle" },
                    { src: IMG + "ardechoise/maillot-capsule.webp", alt: "Maillot de la capsule en rendu 3D" }
                ]
            },
            {
                title: "J'ai monté le film de l'édition",
                html: "J'ai monté des <span class='text-highlight'>films courts</span> à partir d'images de course : rythme, musique et sound design pensés pour être partagés en Reels.",
                video: VID + "ardechoise-film.mp4",
                poster: VID + "ardechoise-film.webp",
                alt: "Extrait du film de L'Ardéchoise"
            },
            {
                title: "J'ai fait vivre l'événement en direct",
                html: "Du 9 au 13 juin, j'étais sur le terrain : stories toute la journée, Reels quotidiens et appel au <span class='text-highlight'>#ardéchoise26</span> pour que les participants partagent leurs propres moments. Sur cette seule semaine, Instagram a cumulé près de 195 000 vues et 287 nouveaux abonnés.",
                images: [
                    { src: IMG + "ardechoise/j-7.webp", alt: "Participants en tenue Ardéchoise" },
                    { src: IMG + "ardechoise/hashtag.webp", alt: "Visuel : partagez vos plus beaux moments avec #ardéchoise26" },
                    { src: IMG + "ardechoise/infos-pratiques.webp", alt: "Peloton au départ devant le village" },
                    { src: IMG + "ardechoise/depart.webp", alt: "Départ de cyclistes" },
                    { src: IMG + "ardechoise/terrain-2.webp", alt: "Participants en tricycle" },
                    { src: IMG + "ardechoise/peloton.webp", alt: "Participants au départ" }
                ]
            },
            {
                title: "J'ai mesuré les résultats",
                html: "Après l'événement, j'ai rédigé un <span class='text-highlight'>bilan complet</span> pour l'organisation : stratégie, formats, chiffres clés Instagram et Facebook, publications les plus performantes et pistes pour 2027.",
                image: IMG + "ardechoise/bilan-chiffres.webp",
                alt: "Page du bilan : chiffres clés Instagram"
            }
        ],
        outcome: "J'ai appris à tenir une ligne éditoriale sur huit mois, à travailler avec un organisateur, des partenaires et des bénévoles, et surtout à piloter mes choix avec les chiffres : les stories et les Reels ont porté l'essentiel de la portée, c'est là que j'investirai en priorité l'an prochain.",
        credits: "Chiffres : mon bilan de mission CM du 15 juin 2026 (Instagram et Facebook, octobre 2025 – juin 2026)."
    },
    {
        id: "circuit-saone-et-loire",
        title: "J'ai créé le site et l'identité du Circuit de Saône-et-Loire 2026",
        cardTitle: "Circuit de Saône-et-Loire 2026",
        category: "web",
        event: true,
        categoryLabel: "Communication événementielle & identité",
        year: "2026",
        featured: true,
        summary: "Site officiel, affiche, maillots distinctifs, dossards, signalétique et bilans partenaires pour la 54ᵉ édition de cette course élite nationale.",
        tagline: "Pour la 54ᵉ édition (8 au 10 mai 2026), j'étais responsable du site internet et des réseaux sociaux, et j'ai décliné l'identité de la course sur tous ses supports.",
        intro: "Le Circuit de Saône-et-Loire est une course par étapes de l'élite nationale née en 1927. Au sein de l'organisation (JAUNE Événements), j'ai pris en charge tout le volet numérique et graphique : j'ai <span class='text-highlight'>conçu et développé le site circuit-71.com</span>, j'ai animé les réseaux sociaux et j'ai créé <span class='text-highlight'>l'affiche, les six maillots distinctifs, les dossards, les plaques de cadre et la signalétique</span>. Après la course, j'ai produit les bilans destinés aux partenaires.",
        tools: ["HTML", "CSS", "JavaScript", "Illustrator", "Photoshop", "Réseaux sociaux"],
        cover: IMG + "circuit-saone-et-loire/site.webp",
        cardCover: IMG + "circuit-saone-et-loire/course.webp",
        cardCoverAlt: "Coureurs en course",
        coverAlt: "Page d'accueil du site circuit-71.com",
        showCover: true,
        role: [
            "J'ai conçu et développé le <strong>site officiel</strong> : direct par étape, classements, parcours GPX, histoire, presse, partenaires et bilans.",
            "J'ai créé l'<strong>affiche 2026</strong> et ses déclinaisons (écran géant, réseaux, présentation officielle).",
            "J'ai dessiné les <strong>six maillots distinctifs</strong> et leurs cadres de présentation pour les podiums.",
            "J'ai réalisé les <strong>dossards, plaques de cadre, stickers et panneaux</strong> de signalétique de course.",
            "J'ai animé les <strong>réseaux sociaux</strong> et produit les <strong>bilans partenaires</strong> (Région, Škoda)."
        ],
        stats: [
            { value: "3", label: "étapes, 474 km et 5 963 m D+" },
            { value: "102", label: "coureurs de 17 équipes élite" },
            { value: "2 500", label: "spectateurs sur le week-end" },
            { value: "34", label: "partenaires publics et privés" }
        ],
        chapters: [
            {
                title: "J'ai développé un site de course complet",
                html: "J'ai voulu un site qui serve de <span class='text-highlight'>point d'entrée unique</span> : un compte à rebours avant la course, puis le direct étape par étape, les classements en PDF, les photos, les traces GPX, l'espace presse et les communiqués. Je l'ai codé à la main en HTML, CSS et JavaScript, responsive de bout en bout.",
                images: [
                    { src: IMG + "circuit-saone-et-loire/site.webp", alt: "Page d'accueil du site" },
                    { src: IMG + "circuit-saone-et-loire/site-etape.webp", alt: "Page d'une étape : Le Creusot – Pierre-de-Bresse" },
                    { src: IMG + "circuit-saone-et-loire/site-histoire.webp", alt: "Page histoire : de 1927 à nos jours" }
                ]
            },
            {
                title: "J'ai pensé le site pour le mobile",
                html: "Le jour de course, les visiteurs sont au bord de la route, téléphone en main. J'ai donc conçu chaque page d'abord pour le <span class='text-highlight'>mobile</span>.",
                image: IMG + "circuit-saone-et-loire/site-mobile.webp",
                alt: "Le site sur mobile",
                poster: true
            },
            {
                title: "J'ai créé l'affiche 2026",
                html: "J'ai imaginé une affiche « Fiers de notre territoire », avec le peloton en photo sur un fond de motifs inspirés du logo. Je l'ai déclinée en plusieurs versions (bleue, or) jusqu'à la version finale, puis sur l'<span class='text-highlight'>écran géant</span> de l'arrivée.",
                images: [
                    { src: IMG + "circuit-saone-et-loire/affiche.webp", alt: "Affiche bleue 2026" },
                    { src: IMG + "circuit-saone-et-loire/affiche-or.webp", alt: "Affiche or 2026" },
                    { src: IMG + "circuit-saone-et-loire/ecran-geant.webp", alt: "Visuel pour l'écran géant" }
                ],
                poster: true
            },
            {
                title: "J'ai dessiné les six maillots distinctifs",
                html: "Général, montagne, jeune, sprint, région et département : j'ai créé un <span class='text-highlight'>motif commun</span> décliné aux couleurs de chaque partenaire, puis présenté les maillots en rendus 3D.",
                images: [
                    { src: IMG + "circuit-saone-et-loire/maillot-general.webp", alt: "Maillot jaune du classement général" },
                    { src: IMG + "circuit-saone-et-loire/maillot-montagne.webp", alt: "Maillot à pois de la montagne" },
                    { src: IMG + "circuit-saone-et-loire/maillot-jeune.webp", alt: "Maillot blanc du meilleur jeune" },
                    { src: IMG + "circuit-saone-et-loire/maillot-sprint.webp", alt: "Maillot vert du sprint" },
                    { src: IMG + "circuit-saone-et-loire/maillot-region.webp", alt: "Maillot de la région" },
                    { src: IMG + "circuit-saone-et-loire/maillot-departement.webp", alt: "Maillot du département" }
                ]
            },
            {
                title: "J'ai conçu les cadres de podium",
                html: "Pour les cérémonies protocolaires et les réseaux, j'ai réalisé des <span class='text-highlight'>cadres de maillots</span> : chaque leader pose avec un visuel aux couleurs de son classement et de son partenaire.",
                images: [
                    { src: IMG + "circuit-saone-et-loire/cadre-leader.webp", alt: "Cadre du maillot jaune Maison Doucet" },
                    { src: IMG + "circuit-saone-et-loire/cadre-montagne.webp", alt: "Cadre du maillot de la montagne E.Leclerc" },
                    { src: IMG + "circuit-saone-et-loire/cadre-combine.webp", alt: "Cadre du maillot de la région" }
                ],
                poster: true
            },
            {
                title: "J'ai réalisé les supports de course",
                html: "Dossards et plaques de cadre, stickers des véhicules officiels, panneaux GPM et flèches de parcours, cartes des étapes : j'ai produit tous les fichiers d'impression.",
                images: [
                    { src: IMG + "circuit-saone-et-loire/dossard.webp", alt: "Dossard 2026" },
                    { src: IMG + "circuit-saone-et-loire/plaque-cadre.webp", alt: "Plaque de cadre" },
                    { src: IMG + "circuit-saone-et-loire/signaletique-gpm.webp", alt: "Panneau GPM à 1 km" },
                    { src: IMG + "circuit-saone-et-loire/stickers.webp", alt: "Sticker Direction générale" },
                    { src: IMG + "circuit-saone-et-loire/signaletique-fleche.webp", alt: "Flèche de parcours" },
                    { src: IMG + "circuit-saone-et-loire/carte.webp", alt: "Carte de l'étape de Chardonnay" }
                ]
            },
            {
                title: "J'ai décliné le logo",
                html: "À partir du logo générique, j'ai créé une <span class='text-highlight'>version millésimée 2026</span> et ses variantes horizontales et verticales.",
                images: [
                    { src: IMG + "circuit-saone-et-loire/logo.webp", alt: "Logo du Circuit de Saône-et-Loire" },
                    { src: IMG + "circuit-saone-et-loire/logo-2026.webp", alt: "Logo millésimé 2026" }
                ]
            },
            {
                title: "J'ai relayé la course et ses retombées",
                html: "De la présentation officielle des équipes aux arrivées, j'ai relayé la course sur le site et les réseaux, puis j'ai intégré les <span class='text-highlight'>communiqués</span> et la revue de presse.",
                images: [
                    { src: IMG + "circuit-saone-et-loire/presentation.webp", alt: "Présentation officielle de l'édition" },
                    { src: IMG + "circuit-saone-et-loire/presentation-scene.webp", alt: "La scène de la présentation" },
                    { src: IMG + "circuit-saone-et-loire/course.webp", alt: "Coureurs en course" },
                    { src: IMG + "circuit-saone-et-loire/presse-1.webp", alt: "Article de presse de l'étape 1" },
                    { src: IMG + "circuit-saone-et-loire/presse-3.webp", alt: "Article de presse de l'étape 3" },
                    { src: IMG + "circuit-saone-et-loire/communique.webp", alt: "Communiqué de presse n°1" }
                ]
            },
            {
                title: "J'ai produit les bilans partenaires",
                html: "Pour fidéliser les partenaires, j'ai conçu des <span class='text-highlight'>bilans imprimables</span> : chiffres de l'édition, visibilité obtenue et photos, avec une version dédiée à la Région et à Škoda.",
                images: [
                    { src: IMG + "circuit-saone-et-loire/bilan.webp", alt: "Bilan 2026 sur le site" },
                    { src: IMG + "circuit-saone-et-loire/bilan-skoda.webp", alt: "Bilan dédié au partenaire Škoda" }
                ]
            }
        ],
        links: [
            { label: "Voir le site circuit-71.com", url: "https://circuit-71.com" }
        ],
        outcome: "C'est le projet où j'ai le plus touché à tout : développement, identité, print, réseaux et relation partenaires. Il m'a appris à gérer des délais d'impression serrés et à penser chaque support comme une pièce d'un même système visuel.",
        credits: "Chiffres : bilan officiel 2026 de l'organisation (JAUNE Événements). Photos de terrain : équipe photo de l'organisation."
    },
    {
        id: "france-vtt",
        title: "J'ai photographié les Championnats de France VTT 2026",
        cardTitle: "Championnats de France VTT 2026",
        category: "photo",
        event: true,
        categoryLabel: "Photographie",
        year: "2026",
        summary: "Quatre jours de reportage au Dévoluy : cross-country, short track, podiums et coulisses.",
        tagline: "En juillet 2026, j'ai couvert pendant quatre jours les Championnats de France de VTT, au Dévoluy.",
        intro: "Poussière, descentes techniques et sprints serrés : j'ai photographié les <span class='text-highlight'>Championnats de France VTT</span> pendant quatre jours. Chaque soir, j'ai trié et retouché les meilleures images pour les livrer le lendemain matin.",
        tools: ["Photographie", "Photoshop"],
        cover: IMG + "france-vtt/poussiere.webp",
        coverAlt: "Vététiste dans un nuage de poussière",
        showCover: false,
        role: [
            "J'ai couvert <strong>quatre jours</strong> de courses : cross-country, short track et podiums.",
            "J'ai repéré les <strong>passages techniques</strong> pour trouver les meilleurs angles.",
            "J'ai <strong>trié et retouché</strong> les images chaque soir.",
            "J'ai photographié les <strong>coulisses</strong> : réglages, émotions d'après-course."
        ],
        stats: [
            { value: "4", label: "jours de reportage" },
            { value: "3 000+", label: "photos prises" }
        ],
        chapters: [
            {
                title: "J'ai cherché les passages qui font la course",
                html: "Je me suis placé là où la course se joue : descentes, virages poussiéreux, relances.",
                images: [
                    { src: IMG + "france-vtt/descente.webp", alt: "Vététiste en descente" },
                    { src: IMG + "france-vtt/poussiere.webp", alt: "Vététiste dans la poussière" },
                    { src: IMG + "france-vtt/duel.webp", alt: "Deux vététistes au coude-à-coude" },
                    { src: IMG + "france-vtt/virage.webp", alt: "Vététiste dans un virage" },
                    { src: IMG + "france-vtt/maillot-jaune.webp", alt: "Leader en maillot jaune" },
                    { src: IMG + "france-vtt/sous-bois.webp", alt: "Vététiste en sous-bois" }
                ]
            },
            {
                title: "J'ai saisi les émotions",
                html: "Arrivées, accolades, réglages avant le départ et podiums : les moments qui racontent la course autrement.",
                images: [
                    { src: IMG + "france-vtt/accolade.webp", alt: "Accolade après l'arrivée" },
                    { src: IMG + "france-vtt/reglage.webp", alt: "Réglage du vélo avant le départ" },
                    { src: IMG + "france-vtt/sprint.webp", alt: "Vététiste après la ligne d'arrivée" },
                    { src: IMG + "france-vtt/arrivee.webp", alt: "Coureuse à l'arrivée" },
                    { src: IMG + "france-vtt/champion.webp", alt: "Champion de France avec son vélo" },
                    { src: IMG + "france-vtt/podium.webp", alt: "Podium des Championnats de France VTT" }
                ]
            }
        ],
        outcome: "Le VTT est plus exigeant à photographier que la route : il faut anticiper la trajectoire, gérer la lumière en sous-bois et accepter de marcher beaucoup pour trouver le bon spot."
    },
    {
        id: "ale-custom",
        title: "J'ai créé et animé le compte Alé Custom France",
        cardTitle: "Alé Custom France",
        category: "social",
        categoryLabel: "Social media & direction artistique",
        year: "2025",
        summary: "J'ai lancé le compte Instagram français de la marque : direction artistique, rendez-vous éditoriaux, shootings et valorisation des clubs.",
        tagline: "En octobre 2025, j'ai lancé la vitrine Instagram française d'Alé Cycling, et j'en assure depuis toute la gestion.",
        intro: "Alé est une marque italienne de textile cycliste premium, partenaire de l'Équipe de France. J'ai créé le compte <span class='text-highlight'>Alé Custom France</span> pour développer sa visibilité auprès des clubs français. J'en définis la <span class='text-highlight'>direction artistique</span>, je planifie et je crée les publications, et j'anime des rendez-vous réguliers comme le « Mardi des clubs ».",
        tools: ["Direction artistique", "Meta Business Suite", "Instagram", "Photoshop"],
        cover: IMG + "ale-custom/pantonier.webp",
        cardCover: IMG + "ale-custom/team-2025.webp",
        cardCoverAlt: "Équipe en tenues Alé Custom 2025",
        coverAlt: "Maillot Alé Custom présenté avec un nuancier Pantone",
        showCover: false,
        role: [
            "J'ai <strong>créé le compte</strong> et défini sa ligne éditoriale et visuelle.",
            "J'ai lancé le rendez-vous hebdomadaire <strong>« Mardi des clubs »</strong> pour valoriser les maillots custom.",
            "J'ai mis en scène les <strong>gammes</strong> (PR.R 2.0, PR.S 1000, PRIME) et les équipes pros équipées.",
            "J'ai raconté le <strong>savoir-faire</strong> : du croquis à l'impression.",
            "Je gère la <strong>publication et la communauté</strong> au quotidien."
        ],
        chapters: [
            {
                title: "J'ai lancé le Mardi des clubs",
                html: "Chaque mardi, je mets en avant un <span class='text-highlight'>maillot custom</span> réalisé pour un club français, avec un gabarit reconnaissable : maillot en 3D sur un fond dégradé aux couleurs du club.",
                images: [
                    { src: IMG + "ale-custom/mardi-clubs-1.webp", alt: "Mardi des clubs, semaine 1" },
                    { src: IMG + "ale-custom/mardi-clubs-2.webp", alt: "Mardi des clubs, semaine 2" },
                    { src: IMG + "ale-custom/mardi-clubs-3.webp", alt: "Mardi des clubs, semaine 3" }
                ]
            },
            {
                title: "J'ai raconté le savoir-faire",
                html: "Pour montrer ce que signifie « custom », j'ai publié les étapes de fabrication : <span class='text-highlight'>croquis, nuancier, impression</span>.",
                images: [
                    { src: IMG + "ale-custom/atelier-croquis.webp", alt: "Croquis de maillot et nuancier" },
                    { src: IMG + "ale-custom/atelier-impression.webp", alt: "Machines d'impression textile" },
                    { src: IMG + "ale-custom/pantonier.webp", alt: "Maillot et nuancier Pantone" }
                ]
            },
            {
                title: "J'ai mis en scène les équipes",
                html: "Shootings studio aux lumières colorées, équipes pros (Bahrain Victorious) et clubs : j'ai construit un feed <span class='text-highlight'>cohérent et premium</span>.",
                images: [
                    { src: IMG + "ale-custom/team-tsa.webp", alt: "Shooting de l'équipe TSA" },
                    { src: IMG + "ale-custom/team-studio.webp", alt: "Shooting studio aux lumières bleues" },
                    { src: IMG + "ale-custom/post-studio.webp", alt: "Shooting studio en tenues Alé" },
                    { src: IMG + "ale-custom/bahrain.webp", alt: "Détail du maillot Bahrain Victorious" },
                    { src: IMG + "ale-custom/team-2025.webp", alt: "Équipe en tenues Alé Custom 2025" },
                    { src: IMG + "ale-custom/troyes.webp", alt: "Supporters avec un drapeau, maillot Alé" }
                ]
            },
            {
                title: "J'ai présenté les gammes",
                html: "J'ai consacré des publications à chaque gamme pour aider les clubs à choisir : coupe, tissus, usage.",
                images: [
                    { src: IMG + "ale-custom/gamme-prr.webp", alt: "Gamme PR.R 2.0" },
                    { src: IMG + "ale-custom/gamme-prs.webp", alt: "Gamme PR.S 1000" },
                    { src: IMG + "ale-custom/gamme-prime.webp", alt: "Gamme PRIME" }
                ]
            },
            {
                title: "J'ai relayé les champions",
                html: "Podiums européens, championnes de France : je relaie les <span class='text-highlight'>performances</span> obtenues en tenue Alé pour renforcer la crédibilité de la marque.",
                images: [
                    { src: IMG + "ale-custom/post-europe.webp", alt: "Podium des Championnats d'Europe" },
                    { src: IMG + "ale-custom/post-champion.webp", alt: "Championne de France en tenue Alé" }
                ]
            }
        ],
        links: [
            { label: "Voir le compte Instagram", url: "https://www.instagram.com/alecustomfrance/" }
        ],
        outcome: "Lancer un compte de zéro m'a appris à poser une ligne éditoriale claire dès le premier post, et à créer des rendez-vous réguliers qui donnent aux abonnés une raison de revenir."
    },
    {
        id: "photographie",
        title: "Je photographie la Côte de Granit Rose, au sol et au drone",
        cardTitle: "Photographie & drone",
        category: "photo",
        categoryLabel: "Photographie & drone",
        year: "2026",
        summary: "Une série personnelle sur la Côte de Granit Rose, entre prises de vue au reflex et au drone.",
        tagline: "En dehors des missions, je photographie la Côte de Granit Rose, à Ploumanac'h, au coucher du soleil.",
        intro: "La photographie est aussi une pratique personnelle. Sur la <span class='text-highlight'>Côte de Granit Rose</span>, je travaille la lumière rasante du soir et les silhouettes, en alternant le reflex et le <span class='text-highlight'>drone</span>.",
        tools: ["Reflex Canon", "Drone DJI"],
        cover: IMG + "photographie/ploumanach-chateau.webp",
        cardCover: IMG + "photographie/coucher-soleil.webp",
        cardCoverAlt: "Coucher de soleil vu du drone",
        coverAlt: "Château de Costaérès au large de Ploumanac'h",
        showCover: true,
        role: [
            "J'ai repéré les lieux et les horaires pour travailler la <strong>lumière du soir</strong>.",
            "J'ai alterné <strong>reflex et drone</strong> pour varier les points de vue.",
            "J'ai développé et retouché la série pour garder une <strong>colorimétrie homogène</strong>."
        ],
        chapters: [
            {
                title: "J'ai travaillé la lumière du soir",
                html: "Rochers de granit, pins maritimes et coucher de soleil sur la baie.",
                images: [
                    { src: IMG + "photographie/ploumanach-rochers.webp", alt: "Rochers de granit rose au coucher du soleil" },
                    { src: IMG + "photographie/ploumanach-pin.webp", alt: "Pin maritime sur la côte" },
                    { src: IMG + "photographie/ploumanach-baie.webp", alt: "Baie de Ploumanac'h au crépuscule" },
                    { src: IMG + "photographie/silhouette.webp", alt: "Silhouette face à la mer" },
                    { src: IMG + "photographie/rochers-mer.webp", alt: "Rochers et mer au crépuscule" },
                    { src: IMG + "photographie/cote.webp", alt: "Côte rocheuse au coucher du soleil" }
                ]
            },
            {
                title: "J'ai pris de la hauteur",
                html: "Le drone me permet de jouer avec la ligne d'horizon, les contre-jours et les lignes graphiques des routes.",
                images: [
                    { src: IMG + "photographie/coucher-soleil.webp", alt: "Coucher de soleil vu du drone" },
                    { src: IMG + "photographie/ploumanach-drone.webp", alt: "Photographe sur les rochers vu du drone" },
                    { src: IMG + "photographie/drone-route.webp", alt: "Intersection de routes vue du ciel" }
                ]
            }
        ],
        outcome: "Photographier pour moi, sans contrainte de client, me permet de progresser techniquement. Je réutilise ensuite ces réflexes de lumière et de cadrage sur le terrain des courses."
    },
    {
        id: "maquettes-custom",
        title: "Je conçois des tenues custom pour des clubs",
        cardTitle: "Tenues custom pour clubs",
        category: "design",
        categoryLabel: "Design textile",
        year: "2025",
        summary: "Je crée des maillots et cuissards sur mesure pour des clubs, du croquis à la maquette validée et signée.",
        tagline: "Du croquis du client à la maquette technique signée : je conçois des tenues personnalisées pour des clubs cyclistes et des entreprises.",
        intro: "Chez Italvet, je conçois des <span class='text-highlight'>tenues custom</span> : j'échange avec le club pour comprendre ses envies, je crée le logo si nécessaire, je dessine la tenue, puis je livre une <span class='text-highlight'>maquette technique</span> (vues, couleurs, tailles) que le client valide et signe avant la production.",
        tools: ["Illustrator", "Photoshop", "CLO 3D"],
        cover: IMG + "maquettes-custom/aubenas.webp",
        coverAlt: "Maquette de tenue custom pour l'UC Aubenas",
        coverPos: "50% 45%",
        showCover: false,
        role: [
            "Je <strong>recueille le besoin</strong> du club (couleurs, sponsors, identité).",
            "Je <strong>dessine la tenue</strong> et crée le logo si nécessaire.",
            "Je livre la <strong>maquette technique</strong> validée et signée par le client.",
            "Je fais le lien avec la <strong>production</strong>."
        ],
        chapters: [
            {
                title: "Je livre des maquettes prêtes à produire",
                html: "Chaque maquette présente maillot et cuissard sous plusieurs angles, avec les informations de production et un <span class='text-highlight'>espace de validation</span> client.",
                images: [
                    { src: IMG + "maquettes-custom/aubenas.webp", alt: "Maquette UC Aubenas" },
                    { src: IMG + "maquettes-custom/piolenc.webp", alt: "Maquette VTT Piolenc" },
                    { src: IMG + "maquettes-custom/agrodijon.webp", alt: "Maquette AgroDijon" }
                ]
            },
            {
                title: "Du croquis au maillot : le club SMAL",
                html: "Pour le club SMAL, tout est parti d'un croquis à la main. J'ai créé un <span class='text-highlight'>logo panthère</span>, cherché un motif « griffures », puis réalisé le maillot final en rendu 3D.",
                images: [
                    { src: IMG + "maquettes-custom/smal-croquis.webp", alt: "Croquis du maillot SMAL" },
                    { src: IMG + "maquettes-custom/smal-logo.webp", alt: "Logo SMAL avec panthère" },
                    { src: IMG + "maquettes-custom/smal-maillot.webp", alt: "Maillot SMAL en rendu 3D" }
                ]
            }
        ],
        outcome: "Le design textile m'a appris à écouter : un club arrive avec une histoire, des couleurs et des sponsors, et mon travail est de tout faire tenir sur un maillot qu'ils seront fiers de porter."
    },
    {
        id: "marketing-newsletter",
        title: "J'ai créé des newsletters et la campagne B2B « Flash 52 »",
        cardTitle: "Newsletters & Flash 52",
        category: "marketing",
        categoryLabel: "Emailing & marketing",
        year: "2026",
        summary: "Newsletters pour Alé, Cipollini et Suplest, et un rendez-vous B2B hebdomadaire codé en HTML, avec bon de commande en ligne.",
        tagline: "J'ai conçu, codé et suivi des campagnes emailing, du design Figma au HTML compatible avec toutes les messageries.",
        intro: "J'ai conçu des <span class='text-highlight'>newsletters</span> pour plusieurs marques (Alé, Cipollini, Suplest), puis j'ai lancé <span class='text-highlight'>Flash 52</span> : un rendez-vous chaque mardi pendant 52 semaines pour les revendeurs, avec une sélection de produits, un <span class='text-highlight'>bon de commande en ligne</span> (stock taille par taille, total HT calculé en direct, signature à l'écran) et des paliers de cadeaux Équipe de France.",
        tools: ["HTML email", "Liquid", "Figma", "Shopify", "Suivi des KPI"],
        cover: IMG + "marketing-newsletter/flash52.webp",
        coverAlt: "Email Flash 52, semaine 2 sur 52",
        coverPos: "50% 0%",
        showCover: false,
        role: [
            "J'ai imaginé le <strong>concept Flash 52</strong> : un rendez-vous fixe chaque mardi pour les revendeurs.",
            "J'ai <strong>codé le gabarit email</strong> en HTML compatible messageries, décliné chaque semaine.",
            "J'ai développé les <strong>pages de bon de commande</strong> sur Shopify (stock, total HT, signature).",
            "J'ai conçu les <strong>newsletters</strong> d'Alé, Cipollini et Suplest et suivi leurs KPI."
        ],
        chapters: [
            {
                title: "J'ai créé un rendez-vous hebdomadaire",
                html: "Un format court et régulier : chaque mardi, une thématique (manche longue, chaussures Suplest, accessoires, vêtements femme…), des prix revendeurs et un lien vers le bon de commande. La régularité crée un vrai <span class='text-highlight'>rendez-vous</span>.",
                images: [
                    { src: IMG + "marketing-newsletter/flash52.webp", alt: "Flash 52, semaine 2" },
                    { src: IMG + "marketing-newsletter/flash52-3.webp", alt: "Flash 52, semaine 3" },
                    { src: IMG + "marketing-newsletter/flash52-5.webp", alt: "Flash 52, semaine 5" },
                    { src: IMG + "marketing-newsletter/flash52-7.webp", alt: "Flash 52, semaine 7" }
                ],
                poster: true
            },
            {
                title: "J'ai conçu des newsletters de marques",
                html: "Pour chaque marque, une mise en page fidèle à son univers : offres de fin d'année Alé, gamme vélo Cipollini, chaussures Suplest.",
                images: [
                    { src: IMG + "marketing-newsletter/ale.webp", alt: "Newsletter Alé Custom" },
                    { src: IMG + "marketing-newsletter/offre-noel.webp", alt: "Offre flash de Noël Alé" },
                    { src: IMG + "marketing-newsletter/cipollini.webp", alt: "Newsletter Cipollini" },
                    { src: IMG + "marketing-newsletter/suplest.webp", alt: "Newsletter Suplest" }
                ]
            }
        ],
        outcome: "J'ai appris que l'emailing est autant une affaire de code (compatibilité Outlook, Gmail, mobile) que de design, et qu'un rendez-vous régulier fidélise mieux qu'une campagne isolée."
    },
    {
        id: "ffc",
        title: "J'ai créé la boutique de la FFC et lancé la gamme Équipe de France 2026",
        cardTitle: "Boutique officielle de la FFC",
        category: "ecommerce",
        categoryLabel: "E-commerce & produit",
        year: "2026",
        summary: "Boutique officielle de la Fédération Française de Cyclisme : catalogue, rendus 3D de la gamme Équipe de France 2026, bannières et précommandes.",
        tagline: "J'ai créé la boutique en ligne officielle de la Fédération Française de Cyclisme, puis j'ai lancé la gamme Équipe de France 2026.",
        intro: "J'ai déployé la <span class='text-highlight'>boutique officielle de la FFC</span> sur Shopify et je gère son catalogue. Pour la collection 2026, j'ai produit les <span class='text-highlight'>rendus 3D</span> de chaque produit (maillots, cuissards, combinaisons, gamme enfant), les bannières de lancement et de précommande, et les supports associés comme les signatures email.",
        tools: ["Shopify", "Liquid", "Rendus 3D", "Photoshop", "Figma"],
        cover: IMG + "ffc/maillot-ml.webp",
        cardCover: IMG + "ffc/cdf-femmes-3.webp",
        cardCoverAlt: "Équipe féminine heureuse après la course",
        coverAlt: "Maillot manches longues Équipe de France 2026 en rendu 3D",
        showCover: false,
        role: [
            "J'ai <strong>créé la boutique</strong> sur Shopify et je gère le catalogue.",
            "J'ai réalisé les <strong>rendus 3D</strong> de toute la gamme Équipe de France 2026.",
            "J'ai conçu les <strong>bannières</strong> de lancement et de précommande.",
            "J'ai créé les <strong>signatures email</strong> 2026 de la fédération."
        ],
        chapters: [
            {
                title: "J'ai modélisé la gamme en 3D",
                html: "Pour présenter les produits avant même leur fabrication, j'ai produit des <span class='text-highlight'>rendus 3D</span> homogènes, sur fond blanc : une base commune pour la boutique, les newsletters et les réseaux.",
                images: [
                    { src: IMG + "ffc/maillot-ml.webp", alt: "Maillot manches longues Équipe de France" },
                    { src: IMG + "ffc/maillot-mc.webp", alt: "Maillot manches courtes Équipe de France" },
                    { src: IMG + "ffc/combinaison.webp", alt: "Combinaison Équipe de France" },
                    { src: IMG + "ffc/cuissard.webp", alt: "Cuissard Équipe de France" },
                    { src: IMG + "ffc/enfant.webp", alt: "Maillot réplica enfant" },
                    { src: IMG + "ffc/manchettes.webp", alt: "Manchettes Équipe de France" }
                ]
            },
            {
                title: "J'ai lancé les précommandes",
                html: "J'ai conçu des bannières de nouveauté et de <span class='text-highlight'>précommande</span>, avec prix et appel à l'action clairs.",
                images: [
                    { src: IMG + "ffc/banniere-nouveaute.webp", alt: "Bannière Nouveauté Équipe de France 2026" },
                    { src: IMG + "ffc/banniere-enfant.webp", alt: "Bannière maillot enfant réplica 2026" },
                    { src: IMG + "ffc/banniere-combi.webp", alt: "Bannière combinaison PR.S 2026" }
                ]
            },
            {
                title: "J'ai construit la boutique",
                html: "Une navigation pensée pour les licenciés comme pour les fans : collections par discipline, fiches produits détaillées, guide des tailles.",
                image: IMG + "ffc.webp",
                alt: "Boutique en ligne de la Fédération Française de Cyclisme"
            },
            {
                title: "J'ai fait vivre la boutique autour des courses",
                html: "J'ai utilisé des images de la <span class='text-highlight'>Coupe de France femmes</span> pour animer la boutique et les réseaux, et j'ai créé les signatures email 2026 de la fédération.",
                images: [
                    { src: IMG + "ffc/cdf-femmes-1.webp", alt: "Sprint d'une manche de Coupe de France femmes" },
                    { src: IMG + "ffc/cdf-femmes-2.webp", alt: "Peloton au bord de la mer" },
                    { src: IMG + "ffc/cdf-femmes-3.webp", alt: "Équipe féminine heureuse après la course" },
                    { src: IMG + "ffc/signature.webp", alt: "Signature email FFC 2026" }
                ]
            }
        ],
        outcome: "Travailler pour une fédération demande de la rigueur : chaque visuel engage l'image de l'Équipe de France. J'ai appris à produire en série, sans perdre en qualité."
    },
    {
        id: "italvet",
        title: "J'ai refait le site e-commerce d'Italvet",
        cardTitle: "Italvet — refonte du site e-commerce",
        category: "ecommerce",
        categoryLabel: "E-commerce & design",
        year: "2025",
        summary: "J'ai modernisé l'identité numérique et l'expérience d'achat du distributeur d'Alé, Cipollini et Ursus, de la maquette Figma à l'intégration Shopify.",
        tagline: "Dans le cadre de mon alternance, j'ai refait entièrement le site Shopify d'Italvet, distributeur français de marques de cyclisme premium.",
        intro: "Italvet distribue en France des marques comme <span class='text-highlight'>Alé, Cipollini ou Ursus</span>. J'ai repensé l'interface et l'expérience d'achat : <span class='text-highlight'>maquettes sous Figma</span>, intégration sur <span class='text-highlight'>Shopify en Liquid</span>, création des visuels de collections. J'ai aussi travaillé l'identité au-delà du site : signatures email, visuels de marques et supports pour les salons.",
        tools: ["Shopify", "Liquid", "HTML", "CSS", "Figma", "Photoshop", "Illustrator"],
        cover: IMG + "italvet.webp",
        coverAlt: "Site Italvet affiché sur ordinateur et mobile",
        showCover: true,
        role: [
            "J'ai conçu les <strong>maquettes</strong> du nouveau site sous Figma.",
            "J'ai <strong>intégré le thème</strong> sur Shopify en Liquid, avec des sections sur mesure.",
            "J'ai créé les <strong>visuels de collections</strong> pour une navigation par usage.",
            "J'ai harmonisé l'identité : <strong>signatures email</strong>, visuels de marques, stands."
        ],
        chapters: [
            {
                title: "J'ai organisé le site par usage",
                html: "Plutôt qu'un classement par marque, j'ai organisé la navigation par <span class='text-highlight'>univers</span> (femmes, route, piste et CLM, enfant), chacun avec son visuel d'entrée.",
                images: [
                    { src: IMG + "italvet/collection-femmes.webp", alt: "Visuel de la collection Femmes" },
                    { src: IMG + "italvet/collection-route.webp", alt: "Visuel de la collection Route" },
                    { src: IMG + "italvet/collection-piste.webp", alt: "Visuel de la collection Piste / CLM" },
                    { src: IMG + "italvet/collection-enfant.webp", alt: "Visuel de la collection Enfant" }
                ]
            },
            {
                title: "J'ai valorisé les marques",
                html: "Pour Ursus (roues et composants), j'ai sélectionné et retouché des images d'ambiance qui mettent le produit en situation.",
                images: [
                    { src: IMG + "italvet/ursus-route.webp", alt: "Cycliste sur route avec roues Ursus" },
                    { src: IMG + "italvet/ursus-vtt.webp", alt: "Vététiste avec roues Ursus" }
                ]
            },
            {
                title: "J'ai harmonisé l'identité",
                html: "Logo, signatures email de l'équipe (y compris pour les vœux de fin d'année) et stands sur les salons : la même identité partout.",
                images: [
                    { src: IMG + "italvet/logo.webp", alt: "Logo Italvet 2025" },
                    { src: IMG + "italvet/signature-italvet.webp", alt: "Signature email Italvet" },
                    { src: IMG + "italvet/signature-voeux.webp", alt: "Signature email des vœux" },
                    { src: IMG + "italvet/stand.webp", alt: "Stand Alé et Cipollini sur un salon" }
                ]
            }
        ],
        outcome: "C'est mon premier projet e-commerce de bout en bout : j'y ai appris à concilier les attentes de plusieurs marques, les contraintes de Shopify et la simplicité d'achat pour le client."
    },
    {
        id: "in-yellow",
        title: "J'ai conçu et développé le site d'In Yellow Consulting",
        cardTitle: "In Yellow Consulting",
        category: "web",
        categoryLabel: "Design & développement web",
        year: "2026",
        summary: "Maquettes et développement du site de la première agence de marketing sportif en France.",
        tagline: "J'ai refait le site d'In Yellow Consulting, agence de marketing sportif fondée en 2006, de la maquette au code.",
        intro: "In Yellow Consulting accompagne des marques et des événements dans le cyclisme et au-delà. J'ai conçu les <span class='text-highlight'>maquettes</span> desktop et mobile du nouveau site, puis je l'ai <span class='text-highlight'>développé</span> : identité jaune et noire, motifs graphiques sur mesure (roues, maillots, flèches), présentation des expertises et des réalisations.",
        tools: ["Figma", "HTML", "CSS", "JavaScript", "GitHub"],
        cover: IMG + "in-yellow/site.webp",
        coverAlt: "Site In Yellow Consulting",
        showCover: true,
        role: [
            "J'ai conçu les <strong>maquettes</strong> desktop et mobile.",
            "J'ai créé les <strong>motifs graphiques</strong> qui rythment le site.",
            "J'ai <strong>développé le site</strong> en HTML, CSS et JavaScript.",
            "J'ai mis en place le <strong>déploiement</strong> via GitHub et le nom de domaine."
        ],
        chapters: [
            {
                title: "J'ai dessiné les maquettes",
                html: "Des maquettes desktop et responsive, présentées sur des cas concrets comme le <span class='text-highlight'>maillot de champion d'Europe UEC</span>.",
                images: [
                    { src: IMG + "in-yellow/maquette-desktop.webp", alt: "Maquette desktop du site In Yellow" },
                    { src: IMG + "in-yellow/maquette-mobile.webp", alt: "Maquette mobile du site In Yellow" },
                    { src: IMG + "in-yellow/maquette-page.webp", alt: "Maquette d'une page complète" }
                ]
            },
            {
                title: "J'ai développé le site",
                html: "J'ai traduit les maquettes en code : présentation de l'agence, grille des expertises, dernières réalisations, version mobile.",
                images: [
                    { src: IMG + "in-yellow/site.webp", alt: "Section de présentation de l'agence" },
                    { src: IMG + "in-yellow/section-expertises.webp", alt: "Section des expertises" },
                    { src: IMG + "in-yellow/mobile.webp", alt: "Le site sur mobile" }
                ]
            }
        ],
        links: [
            { label: "Voir in-yellow.com", url: "https://in-yellow.com" }
        ],
        outcome: "Travailler pour une agence de marketing m'a obligé à soigner chaque détail : le site est leur propre vitrine, il devait refléter leur exigence."
    },
    {
        id: "portfolio",
        title: "J'ai conçu et développé ce portfolio",
        cardTitle: "Ce portfolio",
        category: "web",
        categoryLabel: "Design & développement web",
        year: "2026",
        hue: 225,
        summary: "Direction artistique et développement front-end de ma propre vitrine en ligne.",
        tagline: "J'ai conçu et codé ce site pour présenter mes travaux, sans framework ni modèle.",
        intro: "J'ai voulu un portfolio <span class='text-highlight'>sobre et rapide</span> qui laisse la place aux projets. Je l'ai codé à la main en HTML, CSS et JavaScript : thème clair et sombre, mise en page responsive, pages projets générées à partir d'une <span class='text-highlight'>seule source de données</span>, images et vidéos optimisées.",
        tools: ["HTML", "CSS", "JavaScript", "Figma", "Photoshop", "GitHub"],
        role: [
            "J'ai défini la <strong>direction artistique</strong> : typographies, couleurs, grille.",
            "J'ai <strong>développé le site</strong> sans framework, en HTML, CSS et JavaScript.",
            "J'ai créé un système où <strong>chaque projet est une simple fiche de données</strong>, transformée automatiquement en page.",
            "J'ai <strong>optimisé</strong> toutes les images (WebP) et le référencement (sitemap, données structurées)."
        ],
        outcome: "Faire son propre portfolio, c'est être son propre client : le plus dur a été de trier et de choisir ce qui mérite d'être montré."
    },
    {
        id: "france-cross",
        title: "J'ai piloté la communication des Championnats de France de cross 2026",
        cardTitle: "Championnats de France de cross 2026",
        category: "social",
        event: true,
        categoryLabel: "Social media & création",
        year: "2026",
        summary: "Posts vainqueurs codés sur mesure, programmes, présentation de l'équipe, photo et drone pour les Championnats de France de cross-country à Carhaix.",
        tagline: "Pour l'ALCP Carhaix, organisateur des Championnats de France de cross-country 2026, j'ai piloté la communication digitale avant, pendant et après l'événement.",
        intro: "Sur un championnat de France, onze courses s'enchaînent sur deux jours. Pour publier un <span class='text-highlight'>post vainqueur</span> quelques minutes après chaque arrivée, j'ai conçu mes visuels comme des <span class='text-highlight'>gabarits HTML</span> : je changeais la photo, le nom, le chrono et la catégorie, et le visuel était prêt. J'ai aussi réalisé les programmes, la présentation de l'équipe, et photographié la course au sol et au drone.",
        tools: ["HTML", "CSS", "Photoshop", "Photographie", "Drone"],
        cover: IMG + "france-cross/vainqueur-9.webp",
        cardCover: IMG + "france-cross/arrivee.webp",
        cardCoverAlt: "Arrivée d'une course de cross court",
        coverAlt: "Post vainqueur des Championnats de France de cross 2026",
        coverPos: "50% 78%",
        showCover: false,
        role: [
            "J'ai codé un <strong>gabarit HTML de post vainqueur</strong> pour publier chaque résultat en quelques minutes.",
            "J'ai créé les <strong>programmes</strong> du samedi et du dimanche, les visuels jour J et les remerciements.",
            "J'ai présenté l'<strong>équipe communication</strong> avec des formats décalés (« Wanted »).",
            "J'ai <strong>photographié</strong> les courses et réalisé des <strong>prises de vue au drone</strong> du site."
        ],
        stats: [
            { value: "11", label: "posts vainqueurs publiés" },
            { value: "2", label: "jours de compétition" },
            { value: "4 000+", label: "photos prises sur le week-end" }
        ],
        chapters: [
            {
                title: "J'ai publié chaque vainqueur en quelques minutes",
                html: "Onze courses, onze vainqueurs : chaque post reprend la même identité (bleu-blanc-rouge, étoiles, chrono) avec la photo prise sur la ligne d'arrivée. Le gabarit codé m'a fait gagner un temps précieux et garanti une <span class='text-highlight'>cohérence parfaite</span>.",
                images: [
                    { src: IMG + "france-cross/vainqueur-1.webp", alt: "Post vainqueur : Clément Lhotellerie" },
                    { src: IMG + "france-cross/vainqueur-2.webp", alt: "Post vainqueur : Chloé El Gohri Guigon" },
                    { src: IMG + "france-cross/vainqueur-4.webp", alt: "Post vainqueur : Gaspard Petit" },
                    { src: IMG + "france-cross/vainqueur-6.webp", alt: "Post vainqueur : Laly Forentru" },
                    { src: IMG + "france-cross/vainqueur-9.webp", alt: "Post vainqueur : Margot Dajoux" },
                    { src: IMG + "france-cross/vainqueur-11.webp", alt: "Post vainqueur : Félix Bour" }
                ]
            },
            {
                title: "J'ai préparé le week-end",
                html: "Programmes horaires par journée, visuel jour J, présentation de l'équipe et du protocole : j'ai donné aux spectateurs et aux athlètes toutes les informations utiles, dans la même charte.",
                images: [
                    { src: IMG + "france-cross/programme-samedi.webp", alt: "Programme du samedi 7 mars" },
                    { src: IMG + "france-cross/programme-dimanche.webp", alt: "Programme du dimanche 8 mars" },
                    { src: IMG + "france-cross/jour-j.webp", alt: "Visuel Jour J" },
                    { src: IMG + "france-cross/protocole.webp", alt: "Présentation d'un membre du protocole" },
                    { src: IMG + "france-cross/wanted.webp", alt: "Visuel Wanted de l'équipe communication" },
                    { src: IMG + "france-cross/merci.webp", alt: "Post de remerciements" }
                ]
            },
            {
                title: "J'ai filmé au drone",
                html: "Le drone m'a permis de montrer l'<span class='text-highlight'>ampleur du site</span> de Carhaix et le serpent de coureurs sur le parcours.",
                video: VID + "cross-drone.mp4",
                poster: VID + "cross-drone.webp",
                vertical: true,
                alt: "Vue drone du parcours de cross"
            },
            {
                title: "J'ai photographié la course",
                html: "Départs, arrivées, podiums et coulisses : j'ai couvert les deux journées pour alimenter les réseaux en direct.",
                images: [
                    { src: IMG + "france-cross/vue-site.webp", alt: "Vue aérienne du parcours" },
                    { src: IMG + "france-cross/drone.webp", alt: "Peloton vu du ciel" },
                    { src: IMG + "france-cross/depart.webp", alt: "Coureurs en pleine course" },
                    { src: IMG + "france-cross/arrivee.webp", alt: "Arrivée d'une course de cross court" },
                    { src: IMG + "france-cross/podium.webp", alt: "Athlètes sur le podium" },
                    { src: IMG + "france-cross/securite.webp", alt: "Équipe de la protection civile" }
                ]
            }
        ],
        outcome: "Coder mes visuels plutôt que les refaire à la main a changé ma façon de travailler : sur un événement en direct, l'outil compte autant que le design. Je réutilise depuis cette méthode sur d'autres projets."
    }
];
