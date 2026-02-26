export interface Drink {
    name: string;
    image: string;
    price: number;
    description?: string;
    category?: string;
    badge?: string;
}

export const drinks: Drink[] = [
    { name: "KINGFISHER", image: "https://www.shutterstock.com/shutterstock/photos/2009607470/display_1500/stock-photo-trivandrum-kerala-india-july-three-unopened-ml-bottles-of-india-s-favorite-beer-2009607470.jpg", price: 349, description: "Beer - KINGFISHER", category: "Beer" },
    { name: "KINGFISHER ULTRA", image: "https://www.shutterstock.com/shutterstock/photos/2173201579/display_1500/stock-photo-bangalore-karnataka-india-june-closeup-of-two-cans-of-chilled-kingfisher-beer-2173201579.jpg", price: 399, description: "Beer - KINGFISHER ULTRA", category: "Beer" },
    { name: "BUDWISHER", image: "https://www.shutterstock.com/shutterstock/photos/2087742340/display_1500/stock-photo-marinette-wi-usa-dec-an-outdoor-vendor-sells-budweiser-beer-chilled-on-a-table-with-lots-of-2087742340.jpg", price: 499, description: "Beer - BUDWISHER", category: "Beer" },
    { name: "CORONA", image: "https://www.shutterstock.com/shutterstock/photos/2329732101/display_1500/stock-photo-buenos-aires-argentina-bottles-of-corona-beers-on-ice-2329732101.jpg", price: 550, description: "Beer - CORONA", category: "Beer" },
    { name: "PEOPLE LAGER", image: "https://static.wixstatic.com/media/89a845_3ab0f99b321f4950bac3d0440fa14324~mv2.jpg/v1/fill/w_720,h_853,al_c,q_85,enc_avif,quality_auto/89a845_3ab0f99b321f4950bac3d0440fa14324~mv2.jpg", price: 399, description: "Beer - PEOPLE LAGER", category: "Beer" },
    { name: "HOEGAARDEN", image: "https://www.i-d-s.com/media/catalog/product/cache/cc785faf7cef107a4b8b56da2dcc5725/b/e/be1002.jpg", price: 550, description: "Beer - HOEGAARDEN", category: "Beer" },

    { name: "RED BULL", image: "https://www.bbassets.com/media/uploads/p/l/13377_3-red-bull-energy-drink.jpg", price: 400, description: "Soft Drink - RED BULL", category: "Soft Drink" },
    { name: "COKE", image: "https://www.bbassets.com/media/uploads/p/l/251023_11-coca-cola-soft-drink-original-taste.jpg", price: 195, description: "Soft Drink - COKE", category: "Soft Drink" },
    { name: "DIET COKE", image: "https://frugivore-bucket.s3.amazonaws.com/media/package/img_one/2020-10-17/Coca_Cola_Soft_Drink_-_Diet_Coke_Can__300_Ml.jpg", price: 250, description: "Soft Drink - DIET COKE", category: "Soft Drink" },
    { name: "TONIC WATER", image: "https://www.bbassets.com/media/uploads/p/l/30009568_9-schweppes-indian-tonic-water.jpg", price: 195, description: "Soft Drink - TONIC WATER", category: "Soft Drink" },
    { name: "KELZAI VOLCANIC WATER", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=300&q=80", price: 150, description: "Soft Drink - KELZAI VOLCANIC WATER", category: "Soft Drink" },
    { name: "SPRITE", image: "https://www.bbassets.com/media/uploads/p/l/251006_13-sprite-soft-drink-lime-flavoured.jpg", price: 195, description: "Soft Drink - SPRITE", category: "Soft Drink" },
    { name: "GINGER ALE", image: "https://www.bbassets.com/media/uploads/p/l/251006_13-sprite-soft-drink-lime-flavoured.jpg", price: 195, description: "Soft Drink - GINGER ALE", category: "Soft Drink" },
    { name: "CANNED JUICE", image: "https://3.imimg.com/data3/DG/DG/MY-9339833/canned-juice-250x250.jpeg", price: 175, description: "Soft Drink - CANNED JUICE", category: "Soft Drink" },

    {
        name: "SPICE JAMUN",
        image: "https://www.bbassets.com/media/uploads/p/l/40307750_2-go-desi-masala-jamun-desi-popz-lollipop-candy-java-plum.jpg",
        price: 599,
        description: "Mocktail - SPICE JAMUN",
        category: "Mocktail",
    },
    {
        name: "VIRGEN MOJITO",
        image: "https://www.bbassets.com/media/uploads/p/l/40332813_2-swizzle-virgin-mojito.jpg",
        price: 599,
        description: "Mocktail - VIRGEN MOJITO",
        category: "Mocktail",
    },
    {
        name: "VIRGEN PINACOLADA",
        image: "https://platedcravings.com/wp-content/uploads/2022/06/Virgin-Pina-Colada-Plated-Cravings-9.jpg",
        price: 599,
        description: "Mocktail - VIRGEN PINACOLADA",
        category: "Mocktail",
    },
    {
        name: "YUZU MEZU",
        image: "https://www.bbassets.com/media/uploads/p/l/40355036_1-drix-yuzu-citrus-better-soda.jpg",
        price: 599,
        description: "Mocktail - YUZU MEZU",
        category: "Mocktail",
    },


    { name: "STRAWBERRY SHAKES", image: "https://www.bbassets.com/media/uploads/p/l/40128017_5-jersey-thick-shake-strawberry.jpg", price: 599, description: "Shakes - STRAWBERRY SHAKES", category: "Shakes" },
    { name: "FRESH LIME SODA", image: "https://www.seriouseats.com/thmb/4XtRR7QOJACWhe6VdIO1MdhmmVo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__08__20200816-nimbu-soda-vicky-wasik-1-28079d5d45ee4e47a37a969d1e4834a0.jpg", price: 299, description: "Shakes - FRESH LIME SODA", category: "Shakes" },
    { name: "OREO SHAKE", image: "https://www.allrecipes.com/thmb/fjexyVtheKM6Vr1E1qQDoiDVR7w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/228324oreo-milkshakeFranceC4x3-8a55db984bf84d27bb3f5a4feab4ea20.jpg", price: 599, description: "Shakes - OREO SHAKE", category: "Shakes" },
    { name: "PEANUT BUTTER SHAKE", image: "https://www.almostsupermom.com/wp-content/uploads/2015/07/Peanut-Butter-Milkshake-4352.jpg", price: 599, description: "Shakes - PEANUT BUTTER SHAKE", category: "Shakes" },
    { name: "COLD COFFEE", image: "https://www.allrecipes.com/thmb/uurAF9u7_A91GtY0myns6TSVCBw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/229523the-perfect-peanut-butter-milkshakeFranceC4x-4d9ec20c114342409199e3e1cd3931a6.jpg", price: 599, description: "Shakes - COLD COFFEE", category: "Shakes" },
    { name: "CHOCOLATE SHAKE", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiuHmGj6JWC8RxNcvny2MpaAXbB2pMUdKn-A&s", price: 599, description: "Shakes - CHOCOLATE SHAKE", category: "Shakes" },

    { name: "FRIDAY NIGHT LIHTS", image: "https://images.squarespace-cdn.com/content/v1/5fd3da6b9fd7c16676eb8c7d/4c31c6ec-774c-4d4e-98f4-eaa897872c58/stadium-friday-night-lights.jpg?format=500w", price: 999, description: "Signature Cocktail - FRIDAY NIGHT LIHTS", category: "Signature Cocktail" },
    { name: "DESERT BLOOM", image: "https://static.wixstatic.com/media/aa8160_0d41d6aca8ea416faf4fdb07cabaab7e~mv2.jpg/v1/fill/w_320,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/aa8160_0d41d6aca8ea416faf4fdb07cabaab7e~mv2.jpg", price: 999, description: "Signature Cocktail - DESERT BLOOM", category: "Signature Cocktail" },
    { name: "SUNBURN SPRITZ", image: "https://thesocialsipper.com/wp-content/uploads/2018/07/edcc94d5-27e1-4954-b275-c2c31dda6037.jpg", price: 999, description: "Signature Cocktail - SUNBURN SPRITZ", category: "Signature Cocktail" },
    { name: "MANGO PICANTE", image: "https://amalgama.in/cdn/shop/files/Amalgama_Images_Mango_3.jpg?v=1768394588", price: 999, description: "Signature Cocktail - MANGO PICANTE", category: "Signature Cocktail" },
    { name: "PICASS0", image: "https://reign.asia/cdn/shop/files/WhatsApp_2024-02-0614.54.38_35120b2b.jpg?v=1715158796&width=1200", price: 999, description: "Signature Cocktail - PICASS0", category: "Signature Cocktail" },
    { name: "LEVENDER MARTINI", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80", price: 999, description: "Signature Cocktail - LEVENDER MARTINI", category: "Signature Cocktail" },
    { name: "SPRING TIME SPIZZER", image: "https://www.betterrhodes.com/cdn/shop/files/SJ101Spritz202512pack_720x.png?v=1745351585", price: 999, description: "Signature Cocktail - SPRING TIME SPIZZER", category: "Signature Cocktail" },
    { name: "GOD FATHER", image: "https://static.wixstatic.com/media/89a845_770379a27a9f48f3a8d3cfaf41c51835~mv2.png/v1/fit/w_500,h_500,q_90/file.png", price: 999, description: "Signature Cocktail - GOD FATHER", category: "Signature Cocktail" },
    { name: "BAAREE QUWEEN", image: "https://static.whiskybase.com/storage/whiskies/1/1/8072/201498-big.jpg", price: 999, description: "Signature Cocktail - BAAREE QUWEEN", category: "Signature Cocktail" },
    { name: "WATERMELON MARTINI", image: "https://www.lemonblossoms.com/wp-content/uploads/2022/06/Watermelon-Martini-S1.jpg", price: 999, description: "Signature Cocktail - WATERMELON MARTINI", category: "Signature Cocktail" },
    { name: "TEQUILA PAMENTO", image: "https://cityhive-production-cdn.cityhive.net/products/680623b83a78cc253b6b9691/larger.png", price: 999, description: "Signature Cocktail - TEQUILA PAMENTO", category: "Signature Cocktail" },

    { name: "OLF FASHIONED", image: "https://assets.epicurious.com/photos/5e41a6d175661800087cc87c/1:1/w_2560%2Cc_limit/OldFashioned_HERO_020520_619.jpg", price: 899, description: "Classic Cocktail - OLF FASHIONED", category: "Classic Cocktail" },
    { name: "COSMOPOLITAN", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRPtZsYhgr6YuVvFV7HPvQa3gaB3kDOWRsJw&s", price: 899, description: "Classic Cocktail - COSMOPOLITAN", category: "Classic Cocktail" },
    { name: "SEX ON THE BEACH", image: "https://i.pinimg.com/736x/7b/29/53/7b29538ccff8c1390633df9007ea953f.jpg", price: 899, description: "Classic Cocktail - SEX ON THE BEACH", category: "Classic Cocktail" },
    { name: "GIN BASIL SMAH", image: "https://cdn.diffordsguide.com/cocktail/A2jenA/default/0/512x.webp?v=1737701591", price: 899, description: "Classic Cocktail - GIN BASIL SMAH", category: "Classic Cocktail" },
    { name: "WHISKEY SOUR", image: "https://www.liquor.com/thmb/Oa3KjaP_udh0TYQO9ckm0dPS5PA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/whiskey-sour-1500x1500-hero-c9df509bb1d141f1a8424051c3d78445.jpg", price: 899, description: "Classic Cocktail - WHISKEY SOUR", category: "Classic Cocktail" },
    { name: "PINACOLADA", image: "https://images.immediate.co.uk/production/volatile/sites/30/2013/11/pina-colada-c68aca7.jpg", price: 899, description: "Classic Cocktail - PINACOLADA", category: "Classic Cocktail" },
    { name: "APROL SPRITZ", image: "https://agratefulmeal.com/wp-content/uploads/2023/02/aperol-spritz-cocktail-featured-500x500.jpg", price: 899, description: "Classic Cocktail - APROL SPRITZ", category: "Classic Cocktail" },
    { name: "LONG ISLAND ICE TEA", image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/4/25/0/CCWM_Long-Island-Ice-Tea_s3x4.jpg.rend.hgtvcom.1280.960.suffix/1572356786983.webp", price: 899, description: "Classic Cocktail - LONG ISLAND ICE TEA", category: "Classic Cocktail" },
    { name: "MIMOSA", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Pool-side_Mimosas_at_The_Standard_Hotel.jpg/960px-Pool-side_Mimosas_at_The_Standard_Hotel.jpg", price: 899, description: "Classic Cocktail - MIMOSA", category: "Classic Cocktail" },

    { name: "GLENFIDDCH 12 Y 30ML", image: "https://s3.me-central-1.amazonaws.com/catalog.citydrinks.com/offers/4ece74d1-7671-4c43-a26e-8f1e82147499.jpeg", price: 800, description: "Single Malt Whiskey - GLENFIDDCH 12 Y 30ML", category: "Single Malt Whiskey" },
    { name: "GLENFIDDCH 15 Y 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1AmcwU6VSeYCM6QxAwmzEGyRZzKoUobPljw&s", price: 1400, description: "Single Malt Whiskey - GLENFIDDCH 15 Y 30ML", category: "Single Malt Whiskey" },
    { name: "TALISKER 10 Y 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq_tiQrkShfDbfZ-WZvVW9DsiaeQ7gNJj-VA&s", price: 900, description: "Single Malt Whiskey - TALISKER 10 Y 30ML", category: "Single Malt Whiskey" },
    { name: "INDRI 30ML", image: "https://delhidutyfree.co.in/media/catalog/product/cache/ceacd0da06568c4f89ec5bce1e94438d/2/0/2003022.webp", price: 595, description: "Single Malt Whiskey - INDRI 30ML", category: "Single Malt Whiskey" },
    { name: "GLEN MORNGIE ORGINEL 10 Y 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD1CN6qHrfyB_ECsOa4IqKvp1X91I1KaoyGA&s", price: 700, description: "Single Malt Whiskey - GLEN MORNGIE ORGINEL 10 Y 30ML", category: "Single Malt Whiskey" },

    { name: "SUNTORY TOKI 30ML", image: "https://www.whiskyshop.com/media/catalog/product/s/u/suntorywhisky_toki_engraved_ss.jpg?width=2500&store=whiskyshop&image-type=image", price: 720, description: "American Whisky - SUNTORY TOKI 30ML", category: "American Whisky" },
    { name: "JIM BEAM 30ML", image: "http://beercafe.selfcraftdesign.com/wp-content/uploads/2022/02/jim-beam-white-label-whiskey-removebg-preview-1-1.png", price: 320, description: "American Whisky - JIM BEAM 30ML", category: "American Whisky" },
    { name: "JACK DANIELS NO 7 30ML", image: "https://cdn.selection-prestige.de/media/catalog/product/cache/small_image/640x/a4e40ebdc3e371adff845072e1c73f37/9/9/99933_jack-daniels_old-number-7_700.jpg", price: 499, description: "American Whisky - JACK DANIELS NO 7 30ML", category: "American Whisky" },
    { name: "GENTELMAN JACK 30ML", image: "https://static.wixstatic.com/media/89a845_e02ad26c664840a086ec58d5a60ad267~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg", price: 695, description: "American Whisky - GENTELMAN JACK 30ML", category: "American Whisky" },
    { name: "JAMESON 30ML", image: "http://beercafe.selfcraftdesign.com/wp-content/uploads/2022/02/irish_jam1-removebg-preview.png", price: 445, description: "American Whisky - JAMESON 30ML", category: "American Whisky" },

    { name: " J W BLACK LABEL 30ML", image: "https://minuman.com/cdn/shop/products/JOHNNIE-WALKER-BLACK-ICON-200_800x.jpg?v=1663038108", price: 600, description: "Blended Scotch Whiskey -  J W BLACK LABEL 30ML", category: "Blended Scotch Whiskey" },
    { name: "CHIVAS 12 Y 30ML", image: "https://assets.delicando.com/imagecache/item-fullscreen/4e285d115afe56156b715e35994751a438a7112f784b9451d1f61c8e300c07b5.jpg", price: 600, description: "Blended Scotch Whiskey - CHIVAS 12 Y 30ML", category: "Blended Scotch Whiskey" },
    { name: "CHIVEAS 18 Y 30ML", image: "https://ik.imagekit.io/cvygf2xse/chivas/wp-content/uploads/2025/01/ChivasRegal18-1650x1350-1.png?tr=q-80,w-1650", price: 1200, description: "Blended Scotch Whiskey - CHIVEAS 18 Y 30ML", category: "Blended Scotch Whiskey" },
    { name: " J W RED LABLE 30ML", image: "https://winepalacegoa.com/wp-content/uploads/2023/06/johnnie-walker-red-label-blended-scotch-whisky-200ml_1048x.webp", price: 445, description: "Blended Scotch Whiskey -  J W RED LABLE 30ML", category: "Blended Scotch Whiskey" },
    { name: "BALLANTINE 12 Y 30ML", image: "https://www.aeliadutyfree.hr/media/catalog/product/5/0/5000299604038_2_5c52.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=", price: 500, description: "Blended Scotch Whiskey - BALLANTINE 12 Y 30ML", category: "Blended Scotch Whiskey" },
    { name: "BALLANTINE FINEST 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLjP_V1pe0-0uqwcK4a_nPbG1E9-_hhIc2_A&s", price: 360, description: "Blended Scotch Whiskey - BALLANTINE FINEST 30ML", category: "Blended Scotch Whiskey" },
    { name: "MONKEY SHOULDER 30ML", image: "https://mma.prnewswire.com/media/2363707/Monkey_Shoulder_2.jpg?p=facebook", price: 640, description: "Blended Scotch Whiskey - MONKEY SHOULDER 30ML", category: "Blended Scotch Whiskey" },
    { name: "WOOD FORD RESERVED 30ML", image: "https://australianbartender.com.au/wp-content/uploads/2018/06/woodford-reserve-cocktail.jpg", price: 795, description: "Blended Scotch Whiskey - WOOD FORD RESERVED 30ML", category: "Blended Scotch Whiskey" },

    { name: "JAGER BOMB", image: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA11XVqi.img?w=768&h=576&m=6", price: 699, description: "SHORTS - JAGER BOMB", category: "SHORTS" },
    { name: "KAMAKAZI", image: "https://images.squarespace-cdn.com/content/v1/5bafc73934c4e20db5636a22/a829aee1-520c-41cf-9bac-4322fa14547b/kamikaze.jpg", price: 699, description: "SHORTS - KAMAKAZI", category: "SHORTS" },

    { name: "MALIBU 30ML", image: "https://adm.madyafoodz.sg//Dynamic/Products/169/Images/MalibuBTL.jpg", price: 495, description: "LIQUERS - MALIBU 30ML", category: "LIQUERS" },
    { name: "CAMPARI 30ML", image: "https://images.unsplash.com/photo-1546177461-79dfec0b0928?auto=format&fit=crop&w=300&q=80", price: 495, description: "LIQUERS - CAMPARI 30ML", category: "LIQUERS" },
    { name: "MARTINI BLANCO 30ML", image: "https://delhidutyfree.co.in/media/catalog/product/cache/c3073cf0652b87af145d4aff9d92466d/2/0/2000236.webp", price: 395, description: "LIQUERS - MARTINI BLANCO 30ML", category: "LIQUERS" },
    { name: "CABO 30ML", image: "https://i0.wp.com/notjustspice.com/wp-content/uploads/2017/05/cabo-cabana-1-2.jpg?resize=570%2C820&ssl=1", price: 495, description: "LIQUERS - CABO 30ML", category: "LIQUERS" },
    { name: "TRIPLE SEC 30ML", image: "https://m.media-amazon.com/images/I/61n-FWRN0BL.jpg", price: 395, description: "LIQUERS - TRIPLE SEC 30ML", category: "LIQUERS" },
    { name: "JAGERMISTER 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSsHvK9VAR3yPnJsrKr0UtBEfTb7nS-BgCRw&s", price: 599, description: "LIQUERS - JAGERMISTER 30ML", category: "LIQUERS" },
    { name: "APEROL 30ML", image: "https://localliquor.com.au/wp-content/uploads/2023/12/Aperol-Spritz_16-8-2018_Yaya-Stempler-4257.jpg", price: 499, description: "LIQUERS - APEROL 30ML", category: "LIQUERS" },
    { name: "LIMONCELLO 30ML", image: "https://www.angelopoulos.be/1915-medium_default/limoncello-liqueur-30-lazaris-artisan-distillery-0250-l.jpg", price: 495, description: "LIQUERS - LIMONCELLO 30ML", category: "LIQUERS" },
    { name: "BAILEYS STRAWBERRY CREAM 30ML", image: "https://images.ctfassets.net/p1wk6poseifr/5jNQ7nRKWlbcnPLQXEzd31/b620ebe24a6c12a91d91fad880266836/3535x5000.png", price: 495, description: "LIQUERS - BAILEYS STRAWBERRY CREAM 30ML", category: "LIQUERS" },
    { name: "BAILEYS 30ML", image: "https://adm.madyafoodz.sg//Dynamic/Products/168/Images/Bailey_sIrishBTL.jpg", price: 495, description: "LIQUERS - BAILEYS 30ML", category: "LIQUERS" },
    { name: "KAHLUA 30ML", image: "https://hedonne.in/wp-content/uploads/2024/01/KAHLUA-COFFEE-LIQUEUR-300x300.webp", price: 495, description: "LIQUERS - KAHLUA 30ML", category: "LIQUERS" },

    { name: "BOMBAY SAPPHIRE 30ML", image: "https://adm.madyafoodz.sg//Dynamic/Products/192/Images/bombay-sapphire-gin.jpg", price: 495, description: "GIN - BOMBAY SAPPHIRE 30ML", category: "GIN" },
    { name: "BEEFEATER 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTil5pKuva4K31VCj-kOM2zaS8PvCuR6ufulQ&s", price: 395, description: "GIN - BEEFEATER 30ML", category: "GIN" },
    { name: "GREATER THEN 30ML", image: "https://www.madhuloka.com/web/image/product.template/3634/image_1024?unique=0c4d6f0", price: 395, description: "GIN - GREATER THEN 30ML", category: "GIN" },
    { name: "STRANGER N SONGS 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGYWs6nXCijTWXYinbXXMVpQB4KL9fVRqAWg&s", price: 495, description: "GIN - STRANGER N SONGS 30ML", category: "GIN" },
    { name: "JAISALMER 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrwPps18IoRGObE-wBP7LY2Rlb_eGnq78cDA&s", price: 499, description: "GIN - JAISALMER 30ML", category: "GIN" },
    { name: "SAMSARA PINK 30ML", image: "https://www.madhuloka.com/web/image/product.template/4327/image_1024?unique=0c4d6f0", price: 495, description: "GIN - SAMSARA PINK 30ML", category: "GIN" },
    { name: "SAMSARA 30ML", image: "https://winepalacegoa.com/wp-content/uploads/2023/03/0R7A31212-2-scaled-1.webp", price: 399, description: "GIN - SAMSARA 30ML", category: "GIN" },
    { name: "ROKU 30ML", image: "https://images.augustman.com/wp-content/uploads/2021/05/12201633/Roku_Gin_Thumb.jpg", price: 699, description: "GIN - ROKU 30ML", category: "GIN" },
    { name: "MONKEY 47 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgY6sHYFGClId28NNBX9OgG-ZB36_v1JMcAw&s", price: 855, description: "GIN - MONKEY 47 30ML", category: "GIN" },
    { name: "MALHAR 30ML", image: "https://www.jdl.in/assets/images/brands/malhar/malhar-classic-dry-gin.jpg", price: 499, description: "GIN - MALHAR 30ML", category: "GIN" },
    { name: "UDAIPUR JAMUN 30ML", image: "https://winepalacegoa.com/wp-content/uploads/2024/05/Udaipur-Jamun-gin.png", price: 399, description: "GIN - UDAIPUR JAMUN 30ML", category: "GIN" },
    { name: "PUMARI 30ML", image: "https://static.wixstatic.com/media/89a845_beee99fcb2be4c58a013041df7e2bbb2~mv2.jpg/v1/fill/w_394,h_526,al_c,lg_1,q_80,enc_avif,quality_auto/89a845_beee99fcb2be4c58a013041df7e2bbb2~mv2.jpg", price: 399, description: "GIN - PUMARI 30ML", category: "GIN" },
    { name: "PUMARI PINK 30ML", image: "https://delhidutyfree.co.in/media/catalog/product/cache/ceacd0da06568c4f89ec5bce1e94438d/2/0/2003548_1_1.webp", price: 399, description: "GIN - PUMARI PINK 30ML", category: "GIN" },

    { name: "SIMRNOFF 30ML", image: "https://static.wixstatic.com/media/89a845_932b75f0e2dd40f9807f9eb971116abe~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg", price: 395, description: "VODKA - SIMRNOFF 30ML", category: "VODKA" },
    { name: "GREY GOOSE 30ML", image: "https://adm.madyafoodz.sg//Dynamic/Products/189/Images/greygoose.jpg", price: 599, description: "VODKA - GREY GOOSE 30ML", category: "VODKA" },
    { name: "BELVEDER 30ML", image: "https://www.belvederevodka.com/static/f344b8564bedf7ddf819239a14d3ced4/dirty-brew-page-produit.png", price: 599, description: "VODKA - BELVEDER 30ML", category: "VODKA" },
    { name: "CIROC 30ML", image: "https://delhidutyfree.co.in/media/catalog/product/cache/ceacd0da06568c4f89ec5bce1e94438d/2/0/2000020.webp", price: 599, description: "VODKA - CIROC 30ML", category: "VODKA" },
    { name: "ABSOULT 30ML", image: "https://www.absolut.com/cdn-cgi/image/format=auto,quality=55,width=414/wp-content/uploads/absolut-five_absolut-lime_1x1.jpg", price: 499, description: "VODKA - ABSOULT 30ML", category: "VODKA" },

    { name: "CAMINO SILVER 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAjOLPxG_yyg7CfzlXcgfOwOSe6ysaP-844g&s", price: 545, description: "TEQUILA - CAMINO SILVER 30ML", category: "TEQUILA" },
    { name: "CA MINO GOLD 30ML", image: "https://static.wixstatic.com/media/89a845_681c7df24c7f4d5aa85712c407a006a1~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg", price: 575, description: "TEQUILA - CA MINO GOLD 30ML", category: "TEQUILA" },
    { name: "1800 REPOSADO 30ML", image: "https://winepalacegoa.com/wp-content/uploads/2024/10/1800-Reposado-.png", price: 1100, description: "TEQUILA - 1800 REPOSADO 30ML", category: "TEQUILA" },
    { name: "1800 SILVER 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv99djrJYK3j8UfGW-QfiIyaWQy55-404tzw&s", price: 895, description: "TEQUILA - 1800 SILVER 30ML", category: "TEQUILA" },
    { name: "PISTOLA 30ML", image: "https://hedonne.in/wp-content/uploads/2024/01/MAYA-PISTOLA-AGAVEPURA-REPOSADO.webp", price: 645, description: "TEQUILA - PISTOLA 30ML", category: "TEQUILA" },
    { name: "PATRON SILVER 30ML", image: "https://hedonne.in/wp-content/uploads/2024/01/PATRON-SILVER-TEQUILA.webp", price: 1200, description: "TEQUILA - PATRON SILVER 30ML", category: "TEQUILA" },
    { name: "PATRON REPOSADO 30ML", image: "https://www.patrontequila.com/binaries/content/gallery/patrontequila/products/patron-reposado/v3/bottle.png", price: 1300, description: "TEQUILA - PATRON REPOSADO 30ML", category: "TEQUILA" },
    { name: "DONJULIO REPOSADO 30ML", image: "https://hedonne.in/wp-content/uploads/2024/11/Don-Julio-Reposado-Tequila.webp", price: 1300, description: "TEQUILA - DONJULIO REPOSADO 30ML", category: "TEQUILA" },
    { name: "DONJULIO BLANCO 30ML", image: "https://generalwine.com/cdn/shop/files/donjulioblanco.png?v=1717749802", price: 1100, description: "TEQUILA - DONJULIO BLANCO 30ML", category: "TEQUILA" },

    { name: "OLD MONK 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHzn0M6PtM7CS-qwa1MIP-W-tDaVrB80_d8A&s", price: 299, description: "RUM - OLD MONK 30ML", category: "RUM" },
    { name: "BACARDI WHITE 30ML", image: "https://adm.madyafoodz.sg//Dynamic/Products/172/Images/bacardiRUM.jpeg", price: 395, description: "RUM - BACARDI WHITE 30ML", category: "RUM" },
    { name: "BACARDI BALCK 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPQl9oyVtOJSGc0u-lIlQG9HdVmEqZx6TqCQ&s", price: 395, description: "RUM - BACARDI BALCK 30ML", category: "RUM" },
    { name: "BACARDI LIMON 30ML", image: "https://d323g1xugy1rkz.cloudfront.net/wp-content/uploads/2020/08/21143211/FY23_Bacardi_Global_Our_Rums_Bacardi_Limon-1-1200x1348.jpg", price: 395, description: "RUM - BACARDI LIMON 30ML", category: "RUM" },

    { name: "RED LABEL 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk3lyfeRHyTqYemQGkAEBAceY_jA-YizcgVw&s", price: 400, description: "Hard Liquor - RED LABEL 30ML", category: "Hard liquor" },
    { name: "KOTEL ONE 30ML", image: "https://assets.sato.com.hk/uploads/Product-Detail-Page-21.jpg", price: 450, description: "Hard Liquor - KOTEL ONE 30ML", category: "Hard liquor" },
    { name: "TANQUARY 10 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQueGvye5pqCQjZsbsrXkmO8lJIo65YtHIYLw&s", price: 650, description: "Hard Liquor - TANQUARY 10 30ML", category: "Hard liquor" },
    { name: "HENNSSEY V S 30ML", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYOwHa1bi81KJAd2oNHQmZO4KCnZW6nne0Fg&s", price: 750, description: "Hard Liquor - HENNSSEY V S 30ML", category: "Hard liquor" },

    { name: "SULA BRUT", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpuU0EPbdDDZRXiQmgbSj378cspSgM06rECg&s", price: 6000, description: "SPARKLING WINE - SULA BRUT", category: "SPARKLING WINE" },
    { name: "SULA SECO ROSE", image: "https://static.livcheers.com/static/content/images/liquor/LCIN01893.webp", price: 3500, description: "SPARKLING WINE - SULA SECO ROSE", category: "SPARKLING WINE" },
    { name: "ZONIN PROSECCO", image: "https://delhidutyfree.co.in/media/catalog/product/cache/c3073cf0652b87af145d4aff9d92466d/2/0/2000991.jpeg", price: 9000, description: "SPARKLING WINE - ZONIN PROSECCO", category: "SPARKLING WINE" },

    { name: "JACOB CREEEK CABENET SHIRAZ BTL", image: "https://hedonne.in/wp-content/uploads/2024/01/JACOBS-CREEK-CLASSIC-SHIRAZ-CABERNET.webp", price: 4500, description: "RED WINE - JACOB CREEEK CABENET SHIRAZ BTL", category: "RED WINE" },
    { name: "SULA CABERNET SHIRAZ BTL", image: "https://sulavineyards.com/images/media/you-may-like/New-The-Source-Soublanc-Bottle-image-1-300x300.webp", price: 3000, description: "RED WINE - SULA CABERNET SHIRAZ BTL", category: "RED WINE" },
    { name: "JACOB CREEEK ROSE BTL", image: "https://static.livcheers.com/static/content/images/liquor/LCIN01053.webp", price: 6000, description: "RED WINE - JACOB CREEEK ROSE BTL", category: "RED WINE" },
    { name: "JACOB CREEEK CABENET SHIRAZ GLASS", image: "https://www.i-d-s.com/media/catalog/product/cache/cc785faf7cef107a4b8b56da2dcc5725/a/u/au1044.jpg", price: 900, description: "RED WINE - JACOB CREEEK CABENET SHIRAZ GLASS", category: "RED WINE" },
    { name: "SULA CABERNET SHIRAZ BTL GLASS", image: "https://hedonne.in/wp-content/uploads/2024/01/SULA-VINEYARDS-SHIRAZ-CABERNET.webp", price: 600, description: "RED WINE - SULA CABERNET SHIRAZ BTL GLASS", category: "RED WINE" },
    { name: "JACOB CREEEK ROSE BTL GLASS", image: "https://delhidutyfree.co.in/media/catalog/product/cache/ceacd0da06568c4f89ec5bce1e94438d/2/0/2000110.webp", price: 1200, description: "RED WINE - JACOB CREEEK ROSE BTL GLASS", category: "RED WINE" },

    { name: "JACOB CREEEK CHARDONNAY BTL", image: "https://static.livcheers.com/static/content/images/liquor/LCIN01057.webp", price: 4500, description: "WHITE WINE - JACOB CREEEK CHARDONNAY BTL", category: "WHITE WINE" },
    { name: "SULA SAUVIGNON BLANC BTL", image: "https://hedonne.in/wp-content/uploads/2024/01/SULA-VINEYARDS-SAUVIGNON-BLANC.webp", price: 2500, description: "WHITE WINE - SULA SAUVIGNON BLANC BTL", category: "WHITE WINE" },
    { name: "FRATELLI SAUVIGNON BLANC BTL", image: "https://fratelliwines.in/cdn/shop/files/Sauvignon_Blanc.png?v=1760024474", price: 3000, description: "WHITE WINE - FRATELLI SAUVIGNON BLANC BTL", category: "WHITE WINE" },
    { name: "JACOB CREEEK CHARDONNAY GLASS", image: "https://delhidutyfree.co.in/media/catalog/product/cache/c3073cf0652b87af145d4aff9d92466d/2/0/2000109.webp", price: 900, description: "WHITE WINE - JACOB CREEEK CHARDONNAY GLASS", category: "WHITE WINE" },
    { name: "SULA SAUVIGNON BLANC GLASS", image: "https://lebageecha.com/wp-content/uploads/2024/05/PXL_20240516_083014737.jpg", price: 500, description: "WHITE WINE - SULA SAUVIGNON BLANC GLASS", category: "WHITE WINE" },
    { name: "FRATELLI SAUVIGNON BLANC GLAS", image: "https://fratelliwines.in/cdn/shop/files/Sauvignon_Blanc.png?v=1760024474", price: 600, description: "WHITE WINE - FRATELLI SAUVIGNON BLANC GLAS", category: "WHITE WINE" }
];
