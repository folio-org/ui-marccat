import { Factory } from 'miragejs';

export default Factory.extend({
  'headerTypeCode':31,
  'results':{
    'dateTypeCode':{
      'name':'dateTypeCode',
      'defaultValue':'s',
      'dropdownSelect':[
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'b',
          'label':'No dates given; B.C. date involved'
        },
        {
          'value':'c',
          'label':'Continuing resource: currently published'
        },
        {
          'value':'d',
          'label':'Continuing resource: ceased publication'
        },
        {
          'value':'e',
          'label':'Detailed date'
        },
        {
          'value':'i',
          'label':'Inclusive dates of collection'
        },
        {
          'value':'k',
          'label':'Range of years of bulk of collection'
        },
        {
          'value':'m',
          'label':'Multiple dates'
        },
        {
          'value':'n',
          'label':'Date unknown'
        },
        {
          'value':'p',
          'label':'Different production and release dates'
        },
        {
          'value':'q',
          'label':'Uncertain dates'
        },
        {
          'value':'r',
          'label':'Reprint/reissue date and original date'
        },
        {
          'value':'s',
          'label':'Known or probable single date'
        },
        {
          'value':'t',
          'label':'Actual date and copyright date'
        },
        {
          'value':'u',
          'label':'Continuing resource: status unknown'
        }
      ]
    },
    'placeOfPublication':{
      'name':'placeOfPublication',
      'defaultValue':'enk',
      'dropdownSelect':[
        {
          'value':'aa ',
          'label':'Albania'
        },
        {
          'value':'abc',
          'label':'Alberta'
        },
        {
          'value':'aca',
          'label':'Australian Capital Territory'
        },
        {
          'value':'ae ',
          'label':'Algeria'
        },
        {
          'value':'af ',
          'label':'Afghanistan'
        },
        {
          'value':'ag ',
          'label':'Argentina'
        },
        {
          'value':'ai ',
          'label':'Armenia'
        },
        {
          'value':'aj ',
          'label':'Azerbaijan'
        },
        {
          'value':'aku',
          'label':'Alaska'
        },
        {
          'value':'alu',
          'label':'Alabama'
        },
        {
          'value':'am ',
          'label':'Anguilla'
        },
        {
          'value':'an ',
          'label':'Andorra'
        },
        {
          'value':'ao ',
          'label':'Angola'
        },
        {
          'value':'aq ',
          'label':'Antigua and Barbuda'
        },
        {
          'value':'aru',
          'label':'Arkansas'
        },
        {
          'value':'as ',
          'label':'American Samoa'
        },
        {
          'value':'at ',
          'label':'Australia'
        },
        {
          'value':'au ',
          'label':'Austria'
        },
        {
          'value':'aw ',
          'label':'Aruba'
        },
        {
          'value':'axa',
          'label':'Australian Antarctic Territory'
        },
        {
          'value':'ay ',
          'label':'Antarctica'
        },
        {
          'value':'azu',
          'label':'Arizona'
        },
        {
          'value':'ba ',
          'label':'Bahrain'
        },
        {
          'value':'bb ',
          'label':'Barbados'
        },
        {
          'value':'bcc',
          'label':'British Columbia'
        },
        {
          'value':'bd ',
          'label':'Burundi'
        },
        {
          'value':'be ',
          'label':'Belgium'
        },
        {
          'value':'bf ',
          'label':'Bahamas'
        },
        {
          'value':'bg ',
          'label':'Bangladesh'
        },
        {
          'value':'bh ',
          'label':'Belize'
        },
        {
          'value':'bi ',
          'label':'British Indian Ocean Territory'
        },
        {
          'value':'bl ',
          'label':'Brazil'
        },
        {
          'value':'bm ',
          'label':'Bermuda Islands'
        },
        {
          'value':'bn ',
          'label':'Bosnia and Hercegovina'
        },
        {
          'value':'bo ',
          'label':'Bolivia'
        },
        {
          'value':'bp ',
          'label':'Solomon Islands'
        },
        {
          'value':'br ',
          'label':'Burma'
        },
        {
          'value':'bs ',
          'label':'Botswana'
        },
        {
          'value':'bt ',
          'label':'Bhutan'
        },
        {
          'value':'bu ',
          'label':'Bulgaria'
        },
        {
          'value':'bv ',
          'label':'Bouvet Island'
        },
        {
          'value':'bw ',
          'label':'Byelarus'
        },
        {
          'value':'bx ',
          'label':'Brunei'
        },
        {
          'value':'cau',
          'label':'California'
        },
        {
          'value':'cb ',
          'label':'Cambodia'
        },
        {
          'value':'cc ',
          'label':'China'
        },
        {
          'value':'cd ',
          'label':'Chad'
        },
        {
          'value':'ce ',
          'label':'Sri Lanka'
        },
        {
          'value':'cf ',
          'label':'Congo (Brazzaville)'
        },
        {
          'value':'cg ',
          'label':'Zaire'
        },
        {
          'value':'ch ',
          'label':'China (Republic: 1949- )'
        },
        {
          'value':'ci ',
          'label':'Croatia'
        },
        {
          'value':'cj ',
          'label':'Cayman Islands'
        },
        {
          'value':'ck ',
          'label':'Colombia'
        },
        {
          'value':'cl ',
          'label':'Chile'
        },
        {
          'value':'cm ',
          'label':'Cameroon'
        },
        {
          'value':'cou',
          'label':'Colorado'
        },
        {
          'value':'cq ',
          'label':'Comoros'
        },
        {
          'value':'cr ',
          'label':'Costa Rica'
        },
        {
          'value':'ctu',
          'label':'Connecticut'
        },
        {
          'value':'cu ',
          'label':'Cuba'
        },
        {
          'value':'cv ',
          'label':'Cape Verde'
        },
        {
          'value':'cw ',
          'label':'Cook Islands'
        },
        {
          'value':'cx ',
          'label':'Central African Republic'
        },
        {
          'value':'cy ',
          'label':'Cyprus'
        },
        {
          'value':'dcu',
          'label':'District of Columbia'
        },
        {
          'value':'deu',
          'label':'Delaware'
        },
        {
          'value':'dk ',
          'label':'Denmark'
        },
        {
          'value':'dm ',
          'label':'Benin'
        },
        {
          'value':'dq ',
          'label':'Dominica'
        },
        {
          'value':'dr ',
          'label':'Dominican Republic'
        },
        {
          'value':'ea ',
          'label':'Eritrea'
        },
        {
          'value':'ec ',
          'label':'Ecuador'
        },
        {
          'value':'eg ',
          'label':'Equatorial Guinea'
        },
        {
          'value':'enk',
          'label':'England'
        },
        {
          'value':'er ',
          'label':'Estonia'
        },
        {
          'value':'es ',
          'label':'El Salvador'
        },
        {
          'value':'et ',
          'label':'Ethiopia'
        },
        {
          'value':'fa ',
          'label':'Faroe Islands'
        },
        {
          'value':'fg ',
          'label':'French Guiana'
        },
        {
          'value':'fi ',
          'label':'Finland'
        },
        {
          'value':'fj ',
          'label':'Fiji'
        },
        {
          'value':'fk ',
          'label':'Falkland Islands'
        },
        {
          'value':'flu',
          'label':'Florida'
        },
        {
          'value':'fm ',
          'label':'Micronesia (Federated States)'
        },
        {
          'value':'fp ',
          'label':'French Polynesia'
        },
        {
          'value':'fr ',
          'label':'France'
        },
        {
          'value':'fs ',
          'label':'Terres australes et antarctiques francaises'
        },
        {
          'value':'ft ',
          'label':'Djibouti'
        },
        {
          'value':'gau',
          'label':'Georgia'
        },
        {
          'value':'gb ',
          'label':'Kiribati'
        },
        {
          'value':'gd ',
          'label':'Grenada'
        },
        {
          'value':'gh ',
          'label':'Ghana'
        },
        {
          'value':'gi ',
          'label':'Gibraltar'
        },
        {
          'value':'gl ',
          'label':'Greenland'
        },
        {
          'value':'gm ',
          'label':'Gambia'
        },
        {
          'value':'go ',
          'label':'Gabon'
        },
        {
          'value':'gp ',
          'label':'Guadeloupe'
        },
        {
          'value':'gr ',
          'label':'Greece'
        },
        {
          'value':'gs ',
          'label':'Georgia (Republic)'
        },
        {
          'value':'gt ',
          'label':'Guatemala'
        },
        {
          'value':'gu ',
          'label':'Guam'
        },
        {
          'value':'gv ',
          'label':'Guinea'
        },
        {
          'value':'gw ',
          'label':'Germany'
        },
        {
          'value':'gy ',
          'label':'Guyana'
        },
        {
          'value':'gz ',
          'label':'Gaza Strip'
        },
        {
          'value':'hiu',
          'label':'Hawaii'
        },
        {
          'value':'hm ',
          'label':'Heard and McDonald Islands'
        },
        {
          'value':'hma',
          'label':'Heard and McDonald Islands'
        },
        {
          'value':'ho ',
          'label':'Honduras'
        },
        {
          'value':'ht ',
          'label':'Haiti'
        },
        {
          'value':'hu ',
          'label':'Hungary'
        },
        {
          'value':'iau',
          'label':'Iowa'
        },
        {
          'value':'ic ',
          'label':'Iceland'
        },
        {
          'value':'idu',
          'label':'Idaho'
        },
        {
          'value':'ie ',
          'label':'Ireland'
        },
        {
          'value':'ii ',
          'label':'India'
        },
        {
          'value':'ilu',
          'label':'Illinois'
        },
        {
          'value':'inu',
          'label':'Indiana'
        },
        {
          'value':'io ',
          'label':'Indonesia'
        },
        {
          'value':'iq ',
          'label':'Iraq'
        },
        {
          'value':'ir ',
          'label':'Iran'
        },
        {
          'value':'is ',
          'label':'Israel'
        },
        {
          'value':'it ',
          'label':'Italy'
        },
        {
          'value':'iv ',
          'label':'Code d Ivoire'
        },
        {
          'value':'iy ',
          'label':'Iraq-Saudi Arabia Neutral Zone'
        },
        {
          'value':'ja ',
          'label':'Japan'
        },
        {
          'value':'ji ',
          'label':'Johnston Atoll'
        },
        {
          'value':'jm ',
          'label':'Jamaica'
        },
        {
          'value':'jo ',
          'label':'Jordan'
        },
        {
          'value':'ke ',
          'label':'Kenya'
        },
        {
          'value':'kg ',
          'label':'Kyrgystan'
        },
        {
          'value':'kn ',
          'label':'Korea (North)'
        },
        {
          'value':'ko ',
          'label':'Korea (South)'
        },
        {
          'value':'ksu',
          'label':'Kansas'
        },
        {
          'value':'ku ',
          'label':'Kuwait'
        },
        {
          'value':'kyu',
          'label':'Kentucky'
        },
        {
          'value':'kz ',
          'label':'Kazakhstan'
        },
        {
          'value':'lau',
          'label':'Louisiana'
        },
        {
          'value':'lb ',
          'label':'Liberia'
        },
        {
          'value':'le ',
          'label':'Lebanon'
        },
        {
          'value':'lh ',
          'label':'Liechtenstein'
        },
        {
          'value':'li ',
          'label':'Lithuania'
        },
        {
          'value':'lir',
          'label':'Lithuania'
        },
        {
          'value':'lo ',
          'label':'Lesotho'
        },
        {
          'value':'ls ',
          'label':'Laos'
        },
        {
          'value':'lu ',
          'label':'Luxembourg'
        },
        {
          'value':'lv ',
          'label':'Latvia'
        },
        {
          'value':'ly ',
          'label':'Libya'
        },
        {
          'value':'mau',
          'label':'Massachusetts'
        },
        {
          'value':'mbc',
          'label':'Manitoba'
        },
        {
          'value':'mc ',
          'label':'Monaco'
        },
        {
          'value':'mdu',
          'label':'Maryland'
        },
        {
          'value':'meu',
          'label':'Maine'
        },
        {
          'value':'mf ',
          'label':'Mauritius'
        },
        {
          'value':'mg ',
          'label':'Madagascar'
        },
        {
          'value':'miu',
          'label':'Michigan'
        },
        {
          'value':'mj ',
          'label':'Montserrat'
        },
        {
          'value':'mk ',
          'label':'Oman'
        },
        {
          'value':'ml ',
          'label':'Mali'
        },
        {
          'value':'mm ',
          'label':'Malta'
        },
        {
          'value':'mnu',
          'label':'Minnesota'
        },
        {
          'value':'mou',
          'label':'Missouri'
        },
        {
          'value':'mp ',
          'label':'Mongolia'
        },
        {
          'value':'mq ',
          'label':'Martinique'
        },
        {
          'value':'mr ',
          'label':'Morocco'
        },
        {
          'value':'msu',
          'label':'Mississippi'
        },
        {
          'value':'mtu',
          'label':'Montana'
        },
        {
          'value':'mu ',
          'label':'Mauritania'
        },
        {
          'value':'mv ',
          'label':'Moldova'
        },
        {
          'value':'mw ',
          'label':'Malawi'
        },
        {
          'value':'mx ',
          'label':'Mexico'
        },
        {
          'value':'my ',
          'label':'Malaysia'
        },
        {
          'value':'mz ',
          'label':'Mozambique'
        },
        {
          'value':'na ',
          'label':'Netherlands Antilles'
        },
        {
          'value':'nbu',
          'label':'Nebraska'
        },
        {
          'value':'ncu',
          'label':'North Carolina'
        },
        {
          'value':'ndu',
          'label':'North Dakota'
        },
        {
          'value':'ne ',
          'label':'Netherlands'
        },
        {
          'value':'nfc',
          'label':'Newfoundland'
        },
        {
          'value':'ng ',
          'label':'Niger'
        },
        {
          'value':'nhu',
          'label':'New Hampshire'
        },
        {
          'value':'nik',
          'label':'Northern Ireland'
        },
        {
          'value':'nju',
          'label':'New Jersey'
        },
        {
          'value':'nkc',
          'label':'New Brunswick'
        },
        {
          'value':'nl ',
          'label':'New Caledonia'
        },
        {
          'value':'nmu',
          'label':'New Mexico'
        },
        {
          'value':'nn ',
          'label':'Vanuatu'
        },
        {
          'value':'no ',
          'label':'Norway'
        },
        {
          'value':'np ',
          'label':'Nepal'
        },
        {
          'value':'nq ',
          'label':'Nicaragua'
        },
        {
          'value':'nr ',
          'label':'Nigeria'
        },
        {
          'value':'nsc',
          'label':'Nova Scotia'
        },
        {
          'value':'ntc',
          'label':'Northwest Territories'
        },
        {
          'value':'nu ',
          'label':'Nauru'
        },
        {
          'value':'nuc',
          'label':'Nunavut'
        },
        {
          'value':'nvu',
          'label':'Nevada'
        },
        {
          'value':'nw ',
          'label':'Northern Mariana Islands'
        },
        {
          'value':'nwa',
          'label':'New Guinea'
        },
        {
          'value':'nx ',
          'label':'Norfolk Island'
        },
        {
          'value':'nxa',
          'label':'Norfolk Island'
        },
        {
          'value':'nyu',
          'label':'New York (State)'
        },
        {
          'value':'nz ',
          'label':'New Zealand'
        },
        {
          'value':'ohu',
          'label':'Ohio'
        },
        {
          'value':'oku',
          'label':'Oklahoma'
        },
        {
          'value':'onc',
          'label':'Ontario'
        },
        {
          'value':'oru',
          'label':'Oregon'
        },
        {
          'value':'ot ',
          'label':'Mayotte'
        },
        {
          'value':'pau',
          'label':'Pennsylvania'
        },
        {
          'value':'pc ',
          'label':'Pitcairn Island'
        },
        {
          'value':'pe ',
          'label':'Peru'
        },
        {
          'value':'pf ',
          'label':'Paracel Islands'
        },
        {
          'value':'pg ',
          'label':'Guinea-Bissau'
        },
        {
          'value':'ph ',
          'label':'Philippines'
        },
        {
          'value':'pic',
          'label':'Prince Edward Island'
        },
        {
          'value':'pk ',
          'label':'Pakistan'
        },
        {
          'value':'pl ',
          'label':'Poland'
        },
        {
          'value':'pn ',
          'label':'Panama'
        },
        {
          'value':'po ',
          'label':'Portugal'
        },
        {
          'value':'pp ',
          'label':'Papua New Guinea'
        },
        {
          'value':'ppa',
          'label':'Papua'
        },
        {
          'value':'pr ',
          'label':'Puerto Rico'
        },
        {
          'value':'pw ',
          'label':'Palau'
        },
        {
          'value':'py ',
          'label':'Paraguay'
        },
        {
          'value':'qa ',
          'label':'Qatar'
        },
        {
          'value':'qea',
          'label':'Queensland'
        },
        {
          'value':'quc',
          'label':'Quebec (Province)'
        },
        {
          'value':'re ',
          'label':'Reunion'
        },
        {
          'value':'rh ',
          'label':'Zimbabwe'
        },
        {
          'value':'riu',
          'label':'Rhode Island'
        },
        {
          'value':'rm ',
          'label':'Romania'
        },
        {
          'value':'ru ',
          'label':'Russia (Republic)'
        },
        {
          'value':'rw ',
          'label':'Rwanda'
        },
        {
          'value':'sa ',
          'label':'South Africa'
        },
        {
          'value':'scu',
          'label':'South Carolina'
        },
        {
          'value':'sdu',
          'label':'South Dakota'
        },
        {
          'value':'se ',
          'label':'Seychelles'
        },
        {
          'value':'sf ',
          'label':'Sao Tome and Principe'
        },
        {
          'value':'sg ',
          'label':'Senegal'
        },
        {
          'value':'sh ',
          'label':'Spanish North Africa'
        },
        {
          'value':'si ',
          'label':'Singapore'
        },
        {
          'value':'sj ',
          'label':'Sudan'
        },
        {
          'value':'sl ',
          'label':'Sierra Leone'
        },
        {
          'value':'sm ',
          'label':'San Marino'
        },
        {
          'value':'snc',
          'label':'Saskatchewan'
        },
        {
          'value':'so ',
          'label':'Somalia'
        },
        {
          'value':'sp ',
          'label':'Spain'
        },
        {
          'value':'sq ',
          'label':'Swaziland'
        },
        {
          'value':'sr ',
          'label':'Surinam'
        },
        {
          'value':'ss ',
          'label':'Western Sahara'
        },
        {
          'value':'stk',
          'label':'Scotland'
        },
        {
          'value':'su ',
          'label':'Saudi Arabia'
        },
        {
          'value':'sw ',
          'label':'Sweden'
        },
        {
          'value':'sx ',
          'label':'Namibia'
        },
        {
          'value':'sy ',
          'label':'Syria'
        },
        {
          'value':'sz ',
          'label':'Switzerland'
        },
        {
          'value':'ta ',
          'label':'Tajikstan'
        },
        {
          'value':'tc ',
          'label':'Turks and Caicos Islands'
        },
        {
          'value':'tg ',
          'label':'Togo'
        },
        {
          'value':'th ',
          'label':'Thailand'
        },
        {
          'value':'ti ',
          'label':'Tunisia'
        },
        {
          'value':'tk ',
          'label':'Turkmenistan'
        },
        {
          'value':'tl ',
          'label':'Tokelau Islands'
        },
        {
          'value':'tma',
          'label':'Tasmania'
        },
        {
          'value':'tnu',
          'label':'Tennessee'
        },
        {
          'value':'to ',
          'label':'Tonga'
        },
        {
          'value':'tr ',
          'label':'Trinidad and Tobago'
        },
        {
          'value':'ts ',
          'label':'United Arab Emirates'
        },
        {
          'value':'tu ',
          'label':'Turkey'
        },
        {
          'value':'tv ',
          'label':'Tuvalu'
        },
        {
          'value':'txu',
          'label':'Texas'
        },
        {
          'value':'tz ',
          'label':'Tanzania'
        },
        {
          'value':'ua ',
          'label':'Egypt'
        },
        {
          'value':'uc ',
          'label':'United States Miscellaneous Caribbean Islands'
        },
        {
          'value':'ug ',
          'label':'Uganda'
        },
        {
          'value':'uik',
          'label':'United Kingdom Miscellaneous Islands'
        },
        {
          'value':'un ',
          'label':'Ukraine'
        },
        {
          'value':'up ',
          'label':'United States Miscellaneous Pacific Islands'
        },
        {
          'value':'utu',
          'label':'Utah'
        },
        {
          'value':'uv ',
          'label':'Burkina Faso'
        },
        {
          'value':'uy ',
          'label':'Uruguay'
        },
        {
          'value':'uz ',
          'label':'Uzbekistan'
        },
        {
          'value':'vau',
          'label':'Virginia'
        },
        {
          'value':'vb ',
          'label':'British Virgin Islands'
        },
        {
          'value':'vc ',
          'label':'Vatican City'
        },
        {
          'value':'ve ',
          'label':'Venezuela'
        },
        {
          'value':'vi ',
          'label':'Virgin Islands of the United States'
        },
        {
          'value':'vm ',
          'label':'Vietnam'
        },
        {
          'value':'vp ',
          'label':'Various places'
        },
        {
          'value':'vra',
          'label':'Victoria'
        },
        {
          'value':'vtu',
          'label':'Vermont'
        },
        {
          'value':'wau',
          'label':'Washington (State)'
        },
        {
          'value':'wea',
          'label':'Western Australia'
        },
        {
          'value':'wf ',
          'label':'Wallis and Futuna'
        },
        {
          'value':'wiu',
          'label':'Wisconsin'
        },
        {
          'value':'wj ',
          'label':'West Bank of the Jordan River'
        },
        {
          'value':'wk ',
          'label':'Wake Island'
        },
        {
          'value':'wlk',
          'label':'Wales'
        },
        {
          'value':'ws ',
          'label':'Western Samoa'
        },
        {
          'value':'wvu',
          'label':'West Virginia'
        },
        {
          'value':'wyu',
          'label':'Wyoming'
        },
        {
          'value':'xa ',
          'label':'Christmas Island (Indian Ocean)'
        },
        {
          'value':'xaa',
          'label':'Christmas Island'
        },
        {
          'value':'xb ',
          'label':'Cocos (Keeling) Islands'
        },
        {
          'value':'xba',
          'label':'Cocos (Keeling) Islands'
        },
        {
          'value':'xc ',
          'label':'Maldives'
        },
        {
          'value':'xd ',
          'label':'Saint Kitts-Nevis'
        },
        {
          'value':'xe ',
          'label':'Marshall Islands'
        },
        {
          'value':'xf ',
          'label':'Midway Islands'
        },
        {
          'value':'xga',
          'label':'Coral Sea Islands Territory'
        },
        {
          'value':'xh ',
          'label':'Niue'
        },
        {
          'value':'xj ',
          'label':'Saint Helena'
        },
        {
          'value':'xk ',
          'label':'Saint Lucia'
        },
        {
          'value':'xl ',
          'label':'Saint Pierre and Miquelon'
        },
        {
          'value':'xm ',
          'label':'Saint Vincent and the Grenadines'
        },
        {
          'value':'xn ',
          'label':'Macedonia'
        },
        {
          'value':'xna',
          'label':'New South Wales'
        },
        {
          'value':'xo ',
          'label':'Slovakia'
        },
        {
          'value':'xoa',
          'label':'Northern  Territory'
        },
        {
          'value':'xp ',
          'label':'Spratly Island'
        },
        {
          'value':'xr ',
          'label':'Czech Republic'
        },
        {
          'value':'xra',
          'label':'South Australia'
        },
        {
          'value':'xs ',
          'label':'South Georgia & South Sandwich Islands'
        },
        {
          'value':'xv ',
          'label':'Slovenia'
        },
        {
          'value':'xx ',
          'label':'No place, unknown, or undetermined'
        },
        {
          'value':'xxc',
          'label':'Canada'
        },
        {
          'value':'xxk',
          'label':'United Kingdom'
        },
        {
          'value':'xxr',
          'label':'Soviet Union'
        },
        {
          'value':'xxu',
          'label':'United States'
        },
        {
          'value':'ye ',
          'label':'Yemen'
        },
        {
          'value':'ykc',
          'label':'Yukon Territory'
        },
        {
          'value':'yu ',
          'label':'Montenegro and Serbia'
        },
        {
          'value':'za ',
          'label':'Zambia'
        }
      ]
    },
    'bookIllustrationCode1':{
      'name':'bookIllustrationCode1',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'No illustration'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'a',
          'label':'Illustrations'
        },
        {
          'value':'b',
          'label':'Maps'
        },
        {
          'value':'c',
          'label':'Portraits'
        },
        {
          'value':'d',
          'label':'Charts'
        },
        {
          'value':'e',
          'label':'Plans'
        },
        {
          'value':'f',
          'label':'Plates'
        },
        {
          'value':'g',
          'label':'Music'
        },
        {
          'value':'h',
          'label':'Facsimiles'
        },
        {
          'value':'i',
          'label':'Coats of arms'
        },
        {
          'value':'j',
          'label':'Genealogical tables'
        },
        {
          'value':'k',
          'label':'Forms'
        },
        {
          'value':'l',
          'label':'Samples'
        },
        {
          'value':'m',
          'label':'Sound recordings'
        },
        {
          'value':'o',
          'label':'Photographs'
        },
        {
          'value':'p',
          'label':'Illuminations'
        }
      ]
    },
    'bookIllustrationCode2':{
      'name':'bookIllustrationCode2',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'No illustration'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'a',
          'label':'Illustrations'
        },
        {
          'value':'b',
          'label':'Maps'
        },
        {
          'value':'c',
          'label':'Portraits'
        },
        {
          'value':'d',
          'label':'Charts'
        },
        {
          'value':'e',
          'label':'Plans'
        },
        {
          'value':'f',
          'label':'Plates'
        },
        {
          'value':'g',
          'label':'Music'
        },
        {
          'value':'h',
          'label':'Facsimiles'
        },
        {
          'value':'i',
          'label':'Coats of arms'
        },
        {
          'value':'j',
          'label':'Genealogical tables'
        },
        {
          'value':'k',
          'label':'Forms'
        },
        {
          'value':'l',
          'label':'Samples'
        },
        {
          'value':'m',
          'label':'Sound recordings'
        },
        {
          'value':'o',
          'label':'Photographs'
        },
        {
          'value':'p',
          'label':'Illuminations'
        }
      ]
    },
    'bookIllustrationCode3':{
      'name':'bookIllustrationCode3',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'No illustration'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'a',
          'label':'Illustrations'
        },
        {
          'value':'b',
          'label':'Maps'
        },
        {
          'value':'c',
          'label':'Portraits'
        },
        {
          'value':'d',
          'label':'Charts'
        },
        {
          'value':'e',
          'label':'Plans'
        },
        {
          'value':'f',
          'label':'Plates'
        },
        {
          'value':'g',
          'label':'Music'
        },
        {
          'value':'h',
          'label':'Facsimiles'
        },
        {
          'value':'i',
          'label':'Coats of arms'
        },
        {
          'value':'j',
          'label':'Genealogical tables'
        },
        {
          'value':'k',
          'label':'Forms'
        },
        {
          'value':'l',
          'label':'Samples'
        },
        {
          'value':'m',
          'label':'Sound recordings'
        },
        {
          'value':'o',
          'label':'Photographs'
        },
        {
          'value':'p',
          'label':'Illuminations'
        }
      ]
    },
    'bookIllustrationCode4':{
      'name':'bookIllustrationCode4',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'No illustration'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'a',
          'label':'Illustrations'
        },
        {
          'value':'b',
          'label':'Maps'
        },
        {
          'value':'c',
          'label':'Portraits'
        },
        {
          'value':'d',
          'label':'Charts'
        },
        {
          'value':'e',
          'label':'Plans'
        },
        {
          'value':'f',
          'label':'Plates'
        },
        {
          'value':'g',
          'label':'Music'
        },
        {
          'value':'h',
          'label':'Facsimiles'
        },
        {
          'value':'i',
          'label':'Coats of arms'
        },
        {
          'value':'j',
          'label':'Genealogical tables'
        },
        {
          'value':'k',
          'label':'Forms'
        },
        {
          'value':'l',
          'label':'Samples'
        },
        {
          'value':'m',
          'label':'Sound recordings'
        },
        {
          'value':'o',
          'label':'Photographs'
        },
        {
          'value':'p',
          'label':'Illuminations'
        }
      ]
    },
    'targetAudienceCode':{
      'name':'targetAudienceCode',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'Unknown or not specified'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'a',
          'label':'Preschool'
        },
        {
          'value':'b',
          'label':'Primary'
        },
        {
          'value':'c',
          'label':'Pre-adolescent'
        },
        {
          'value':'d',
          'label':'Adolescent'
        },
        {
          'value':'e',
          'label':'Adult'
        },
        {
          'value':'f',
          'label':'Specialized'
        },
        {
          'value':'g',
          'label':'General'
        },
        {
          'value':'j',
          'label':'Juvenile'
        },
        {
          'value':'u',
          'label':'School material at first level [OBSOLETE]'
        },
        {
          'value':'v',
          'label':'School material at second level [OBSOLETE]'
        }
      ]
    },
    'formOfItemCode':{
      'name':'formOfItemCode',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'None of the following'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'a',
          'label':'Microfilm'
        },
        {
          'value':'b',
          'label':'Microfiche'
        },
        {
          'value':'c',
          'label':'Microopaque'
        },
        {
          'value':'d',
          'label':'Large-print'
        },
        {
          'value':'f',
          'label':'Braille'
        },
        {
          'value':'o',
          'label':'Online'
        },
        {
          'value':'q',
          'label':'Direct electronic'
        },
        {
          'value':'r',
          'label':'Regular print reproduction'
        },
        {
          'value':'s',
          'label':'Electronic'
        }
      ]
    },
    'natureOfContent1':{
      'name':'natureOfContent1',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'No specified nature of contents'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'2',
          'label':'Offprints'
        },
        {
          'value':'5',
          'label':'Calendars'
        },
        {
          'value':'6',
          'label':'Comics/graphic novels'
        },
        {
          'value':'a',
          'label':'Abstracts/summaries'
        },
        {
          'value':'b',
          'label':'Bibliographies'
        },
        {
          'value':'c',
          'label':'Catalogues'
        },
        {
          'value':'d',
          'label':'Dictionaries'
        },
        {
          'value':'e',
          'label':'Encyclopedias'
        },
        {
          'value':'f',
          'label':'Handbooks'
        },
        {
          'value':'g',
          'label':'Legal articles'
        },
        {
          'value':'i',
          'label':'Indexes'
        },
        {
          'value':'j',
          'label':'Patent Documents'
        },
        {
          'value':'k',
          'label':'Discographies'
        },
        {
          'value':'l',
          'label':'Legislation'
        },
        {
          'value':'m',
          'label':'Theses'
        },
        {
          'value':'n',
          'label':'Surveys of the literature in a subject area'
        },
        {
          'value':'o',
          'label':'Reviews'
        },
        {
          'value':'p',
          'label':'Programmed texts'
        },
        {
          'value':'q',
          'label':'Filmographies'
        },
        {
          'value':'r',
          'label':'Directories'
        },
        {
          'value':'s',
          'label':'Statistics'
        },
        {
          'value':'t',
          'label':'Technical reports'
        },
        {
          'value':'u',
          'label':'tandards/specifications'
        },
        {
          'value':'v',
          'label':'Legal cases and case notes'
        },
        {
          'value':'w',
          'label':'Law reports and digests'
        },
        {
          'value':'y',
          'label':'Yearbooks'
        },
        {
          'value':'z',
          'label':'Treaties'
        }
      ]
    },
    'natureOfContent2':{
      'name':'natureOfContent2',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'No specified nature of contents'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'2',
          'label':'Offprints'
        },
        {
          'value':'5',
          'label':'Calendars'
        },
        {
          'value':'6',
          'label':'Comics/graphic novels'
        },
        {
          'value':'a',
          'label':'Abstracts/summaries'
        },
        {
          'value':'b',
          'label':'Bibliographies'
        },
        {
          'value':'c',
          'label':'Catalogues'
        },
        {
          'value':'d',
          'label':'Dictionaries'
        },
        {
          'value':'e',
          'label':'Encyclopedias'
        },
        {
          'value':'f',
          'label':'Handbooks'
        },
        {
          'value':'g',
          'label':'Legal articles'
        },
        {
          'value':'i',
          'label':'Indexes'
        },
        {
          'value':'j',
          'label':'Patent Documents'
        },
        {
          'value':'k',
          'label':'Discographies'
        },
        {
          'value':'l',
          'label':'Legislation'
        },
        {
          'value':'m',
          'label':'Theses'
        },
        {
          'value':'n',
          'label':'Surveys of the literature in a subject area'
        },
        {
          'value':'o',
          'label':'Reviews'
        },
        {
          'value':'p',
          'label':'Programmed texts'
        },
        {
          'value':'q',
          'label':'Filmographies'
        },
        {
          'value':'r',
          'label':'Directories'
        },
        {
          'value':'s',
          'label':'Statistics'
        },
        {
          'value':'t',
          'label':'Technical reports'
        },
        {
          'value':'u',
          'label':'tandards/specifications'
        },
        {
          'value':'v',
          'label':'Legal cases and case notes'
        },
        {
          'value':'w',
          'label':'Law reports and digests'
        },
        {
          'value':'y',
          'label':'Yearbooks'
        },
        {
          'value':'z',
          'label':'Treaties'
        }
      ]
    },
    'natureOfContent3':{
      'name':'natureOfContent3',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'No specified nature of contents'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'2',
          'label':'Offprints'
        },
        {
          'value':'5',
          'label':'Calendars'
        },
        {
          'value':'6',
          'label':'Comics/graphic novels'
        },
        {
          'value':'a',
          'label':'Abstracts/summaries'
        },
        {
          'value':'b',
          'label':'Bibliographies'
        },
        {
          'value':'c',
          'label':'Catalogues'
        },
        {
          'value':'d',
          'label':'Dictionaries'
        },
        {
          'value':'e',
          'label':'Encyclopedias'
        },
        {
          'value':'f',
          'label':'Handbooks'
        },
        {
          'value':'g',
          'label':'Legal articles'
        },
        {
          'value':'i',
          'label':'Indexes'
        },
        {
          'value':'j',
          'label':'Patent Documents'
        },
        {
          'value':'k',
          'label':'Discographies'
        },
        {
          'value':'l',
          'label':'Legislation'
        },
        {
          'value':'m',
          'label':'Theses'
        },
        {
          'value':'n',
          'label':'Surveys of the literature in a subject area'
        },
        {
          'value':'o',
          'label':'Reviews'
        },
        {
          'value':'p',
          'label':'Programmed texts'
        },
        {
          'value':'q',
          'label':'Filmographies'
        },
        {
          'value':'r',
          'label':'Directories'
        },
        {
          'value':'s',
          'label':'Statistics'
        },
        {
          'value':'t',
          'label':'Technical reports'
        },
        {
          'value':'u',
          'label':'tandards/specifications'
        },
        {
          'value':'v',
          'label':'Legal cases and case notes'
        },
        {
          'value':'w',
          'label':'Law reports and digests'
        },
        {
          'value':'y',
          'label':'Yearbooks'
        },
        {
          'value':'z',
          'label':'Treaties'
        }
      ]
    },
    'natureOfContent4':{
      'name':'natureOfContent4',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'No specified nature of contents'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'2',
          'label':'Offprints'
        },
        {
          'value':'5',
          'label':'Calendars'
        },
        {
          'value':'6',
          'label':'Comics/graphic novels'
        },
        {
          'value':'a',
          'label':'Abstracts/summaries'
        },
        {
          'value':'b',
          'label':'Bibliographies'
        },
        {
          'value':'c',
          'label':'Catalogues'
        },
        {
          'value':'d',
          'label':'Dictionaries'
        },
        {
          'value':'e',
          'label':'Encyclopedias'
        },
        {
          'value':'f',
          'label':'Handbooks'
        },
        {
          'value':'g',
          'label':'Legal articles'
        },
        {
          'value':'i',
          'label':'Indexes'
        },
        {
          'value':'j',
          'label':'Patent Documents'
        },
        {
          'value':'k',
          'label':'Discographies'
        },
        {
          'value':'l',
          'label':'Legislation'
        },
        {
          'value':'m',
          'label':'Theses'
        },
        {
          'value':'n',
          'label':'Surveys of the literature in a subject area'
        },
        {
          'value':'o',
          'label':'Reviews'
        },
        {
          'value':'p',
          'label':'Programmed texts'
        },
        {
          'value':'q',
          'label':'Filmographies'
        },
        {
          'value':'r',
          'label':'Directories'
        },
        {
          'value':'s',
          'label':'Statistics'
        },
        {
          'value':'t',
          'label':'Technical reports'
        },
        {
          'value':'u',
          'label':'tandards/specifications'
        },
        {
          'value':'v',
          'label':'Legal cases and case notes'
        },
        {
          'value':'w',
          'label':'Law reports and digests'
        },
        {
          'value':'y',
          'label':'Yearbooks'
        },
        {
          'value':'z',
          'label':'Treaties'
        }
      ]
    },
    'governmentPublicationCode':{
      'name':'governmentPublicationCode',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'Not a government publication'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'a',
          'label':'Autonomous or semi-autonomous components'
        },
        {
          'value':'c',
          'label':'Multilocal'
        },
        {
          'value':'f',
          'label':'Federal/national'
        },
        {
          'value':'i',
          'label':'International intergovernmental'
        },
        {
          'value':'l',
          'label':'Local'
        },
        {
          'value':'m',
          'label':'Multistate'
        },
        {
          'value':'o',
          'label':'Government publication - level undetermined'
        },
        {
          'value':'s',
          'label':'State, provincial, territorial, dependant, etc.'
        },
        {
          'value':'u',
          'label':'Unknown if item is government publication'
        },
        {
          'value':'z',
          'label':'Other'
        }
      ]
    },
    'conferencePublicationCode':{
      'name':'conferencePublicationCode',
      'defaultValue':'0',
      'dropdownSelect':[
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'0',
          'label':'Not a conference publication'
        },
        {
          'value':'1',
          'label':'Conference publication'
        }
      ]
    },
    'bookFestschrift':{
      'name':'bookFestschrift',
      'defaultValue':'0',
      'dropdownSelect':[
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'0',
          'label':'Not a festschrift'
        },
        {
          'value':'1',
          'label':'Festschrift'
        }
      ]
    },
    'bookIndexAvailabilityCode':{
      'name':'bookIndexAvailabilityCode',
      'defaultValue':'0',
      'dropdownSelect':[
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'0',
          'label':'No index'
        },
        {
          'value':'1',
          'label':'Index present'
        }
      ]
    },
    'bookLiteraryFormTypeCode':{
      'name':'bookLiteraryFormTypeCode',
      'defaultValue':'u',
      'dropdownSelect':[
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'0',
          'label':'Non-fiction'
        },
        {
          'value':'1',
          'label':'Fiction'
        },
        {
          'value':'d',
          'label':'Dramas'
        },
        {
          'value':'e',
          'label':'Essays '
        },
        {
          'value':'f',
          'label':'Novels'
        },
        {
          'value':'h',
          'label':'Humour, satire, etc.'
        },
        {
          'value':'i',
          'label':'Letters '
        },
        {
          'value':'j',
          'label':'Short stories'
        },
        {
          'value':'m',
          'label':'Mixed forms'
        },
        {
          'value':'p',
          'label':'Poetry'
        },
        {
          'value':'s',
          'label':'Speeches, oratory'
        },
        {
          'value':'u',
          'label':'Unknown'
        }
      ]
    },
    'bookBiographyCode':{
      'name':'bookBiographyCode',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'No biographical material'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'a',
          'label':'Autobiography'
        },
        {
          'value':'b',
          'label':'Individual biography'
        },
        {
          'value':'c',
          'label':'Collective biography'
        },
        {
          'value':'d',
          'label':'Contains biographical information'
        }
      ]
    },
    'languageCode':{
      'name':'languageCode',
      'defaultValue':'eng',
      'dropdownSelect':[
        {
          'value':'   ',
          'label':'No information provided'
        },
        {
          'value':'aar',
          'label':'Afar'
        },
        {
          'value':'abk',
          'label':'Abkhaz'
        },
        {
          'value':'ace',
          'label':'Achinese'
        },
        {
          'value':'ach',
          'label':'Acoli'
        },
        {
          'value':'ada',
          'label':'Adangme'
        },
        {
          'value':'ady',
          'label':'Adygei'
        },
        {
          'value':'afa',
          'label':'Afroasiatic (Other)'
        },
        {
          'value':'afh',
          'label':'Afrihili (Artificial language)'
        },
        {
          'value':'afr',
          'label':'Afrikaans'
        },
        {
          'value':'ain',
          'label':'Ainu'
        },
        {
          'value':'aka',
          'label':'Akan'
        },
        {
          'value':'akk',
          'label':'Akkadian'
        },
        {
          'value':'alb',
          'label':'Albanian'
        },
        {
          'value':'ale',
          'label':'Aleut'
        },
        {
          'value':'alg',
          'label':'Algonquian languages (other)'
        },
        {
          'value':'alt',
          'label':'Altai'
        },
        {
          'value':'amh',
          'label':'Amharic'
        },
        {
          'value':'ang',
          'label':'English, Old (ca. 450-1100)'
        },
        {
          'value':'anp',
          'label':'Angika'
        },
        {
          'value':'apa',
          'label':'Apache languages'
        },
        {
          'value':'ara',
          'label':'Arabic'
        },
        {
          'value':'arc',
          'label':'Aramaic'
        },
        {
          'value':'arg',
          'label':'Aragonés'
        },
        {
          'value':'arm',
          'label':'Armenian'
        },
        {
          'value':'arn',
          'label':'Araucanian Mapuche'
        },
        {
          'value':'arp',
          'label':'Arapaho'
        },
        {
          'value':'art',
          'label':'Artificial (Other)'
        },
        {
          'value':'arw',
          'label':'Arawak'
        },
        {
          'value':'asm',
          'label':'Assamese'
        },
        {
          'value':'ast',
          'label':'Bable'
        },
        {
          'value':'ath',
          'label':'Athapascan (other)'
        },
        {
          'value':'aus',
          'label':'Australian Aboriginal languages'
        },
        {
          'value':'ava',
          'label':'Avaric'
        },
        {
          'value':'ave',
          'label':'Avestan'
        },
        {
          'value':'awa',
          'label':'Awadhi'
        },
        {
          'value':'aym',
          'label':'Aymara'
        },
        {
          'value':'aze',
          'label':'Azerbaijani'
        },
        {
          'value':'bad',
          'label':'Banda'
        },
        {
          'value':'bai',
          'label':'Bamileke languages'
        },
        {
          'value':'bak',
          'label':'Bashkir'
        },
        {
          'value':'bal',
          'label':'Baluchi'
        },
        {
          'value':'bam',
          'label':'Bambara'
        },
        {
          'value':'ban',
          'label':'Balinese'
        },
        {
          'value':'baq',
          'label':'Basque'
        },
        {
          'value':'bas',
          'label':'Basa'
        },
        {
          'value':'bat',
          'label':'Baltic (Other)'
        },
        {
          'value':'bej',
          'label':'Beja'
        },
        {
          'value':'bel',
          'label':'Belarusian'
        },
        {
          'value':'bem',
          'label':'Bemba'
        },
        {
          'value':'ben',
          'label':'Bengali'
        },
        {
          'value':'ber',
          'label':'Berber (other)'
        },
        {
          'value':'bho',
          'label':'Bhojpuri'
        },
        {
          'value':'bih',
          'label':'Bihari'
        },
        {
          'value':'bik',
          'label':'Bikol'
        },
        {
          'value':'bin',
          'label':'Bini'
        },
        {
          'value':'bis',
          'label':'Bislama'
        },
        {
          'value':'bla',
          'label':'Siksika'
        },
        {
          'value':'bnt',
          'label':'Bantu (other)'
        },
        {
          'value':'bos',
          'label':'Bosnian'
        },
        {
          'value':'bra',
          'label':'Braj'
        },
        {
          'value':'bre',
          'label':'Breton'
        },
        {
          'value':'btk',
          'label':'Batak Bugis'
        },
        {
          'value':'bua',
          'label':'Buriat'
        },
        {
          'value':'bug',
          'label':'Buginese'
        },
        {
          'value':'bul',
          'label':'Bulgarian'
        },
        {
          'value':'bur',
          'label':'Burmese'
        },
        {
          'value':'byn',
          'label':'Bilin'
        },
        {
          'value':'cad',
          'label':'Caddo'
        },
        {
          'value':'cai',
          'label':'Central American Indian (Other)'
        },
        {
          'value':'car',
          'label':'Carib'
        },
        {
          'value':'cat',
          'label':'Catalan'
        },
        {
          'value':'cau',
          'label':'Caucasian (Other)'
        },
        {
          'value':'ceb',
          'label':'Cebuano'
        },
        {
          'value':'cel',
          'label':'Celtic (other)'
        },
        {
          'value':'cha',
          'label':'Chamorro'
        },
        {
          'value':'chb',
          'label':'Chibcha'
        },
        {
          'value':'che',
          'label':'Chechen'
        },
        {
          'value':'chg',
          'label':'Chagatai'
        },
        {
          'value':'chi',
          'label':'Chinese'
        },
        {
          'value':'chk',
          'label':'Truk'
        },
        {
          'value':'chm',
          'label':'Mari'
        },
        {
          'value':'chn',
          'label':'Chinook jargon'
        },
        {
          'value':'cho',
          'label':'Choctaw'
        },
        {
          'value':'chp',
          'label':'Chipewyan'
        },
        {
          'value':'chr',
          'label':'Cherokee'
        },
        {
          'value':'chu',
          'label':'Church Slavic'
        },
        {
          'value':'chv',
          'label':'Chuvash'
        },
        {
          'value':'chy',
          'label':'Cheyenne'
        },
        {
          'value':'cmc',
          'label':'Chamic (other)'
        },
        {
          'value':'cop',
          'label':'Coptic'
        },
        {
          'value':'cor',
          'label':'Cornish'
        },
        {
          'value':'cos',
          'label':'Corsican'
        },
        {
          'value':'cpe',
          'label':'Creoles and Pidgins, English-based (Other)'
        },
        {
          'value':'cpf',
          'label':'Creoles and Pidgins, French-based (Other)'
        },
        {
          'value':'cpp',
          'label':'Creoles and Pidgins, Portuguese-based (Other)'
        },
        {
          'value':'cre',
          'label':'Cree'
        },
        {
          'value':'crh',
          'label':'Crimean Tatar'
        },
        {
          'value':'crp',
          'label':'Creoles and Pidgins (Other)'
        },
        {
          'value':'csb',
          'label':'Kashubian'
        },
        {
          'value':'cus',
          'label':'Cushitic (Other)'
        },
        {
          'value':'cze',
          'label':'Czech'
        },
        {
          'value':'dak',
          'label':'Dakota'
        },
        {
          'value':'dan',
          'label':'Danish'
        },
        {
          'value':'dar',
          'label':'Dargwa'
        },
        {
          'value':'day',
          'label':'Dayak'
        },
        {
          'value':'del',
          'label':'Delaware'
        },
        {
          'value':'den',
          'label':'Slave'
        },
        {
          'value':'dgr',
          'label':'Dogrib'
        },
        {
          'value':'din',
          'label':'Dinka'
        },
        {
          'value':'div',
          'label':'Divchi'
        },
        {
          'value':'doi',
          'label':'Dogri'
        },
        {
          'value':'dra',
          'label':'Dravidian (Other)'
        },
        {
          'value':'dsb',
          'label':'Lower Sorbian'
        },
        {
          'value':'dua',
          'label':'Duala'
        },
        {
          'value':'dum',
          'label':'Dutch, Middle (ca. 1050-1350)'
        },
        {
          'value':'dut',
          'label':'Dutch'
        },
        {
          'value':'dyu',
          'label':'Dyula'
        },
        {
          'value':'dzo',
          'label':'Dzongka'
        },
        {
          'value':'efi',
          'label':'Efik'
        },
        {
          'value':'egy',
          'label':'Egyptian'
        },
        {
          'value':'eka',
          'label':'Ekajuk'
        },
        {
          'value':'elx',
          'label':'Elamite'
        },
        {
          'value':'eng',
          'label':'English'
        },
        {
          'value':'enm',
          'label':'English, Middle (1100-1500)'
        },
        {
          'value':'epo',
          'label':'Esperanto'
        },
        {
          'value':'est',
          'label':'Estonian'
        },
        {
          'value':'ewe',
          'label':'Ewe'
        },
        {
          'value':'ewo',
          'label':'Ewondo'
        },
        {
          'value':'fan',
          'label':'Fang'
        },
        {
          'value':'fao',
          'label':'Faroese'
        },
        {
          'value':'fat',
          'label':'Fanti'
        },
        {
          'value':'fij',
          'label':'Fijian'
        },
        {
          'value':'fil',
          'label':'Filipino'
        },
        {
          'value':'fin',
          'label':'Finnish'
        },
        {
          'value':'fiu',
          'label':'Finno-Ugrian (Other)'
        },
        {
          'value':'fon',
          'label':'Fon'
        },
        {
          'value':'fre',
          'label':'French'
        },
        {
          'value':'frm',
          'label':'French, Middle (ca. 1400-1600)'
        },
        {
          'value':'fro',
          'label':'French, Old (ca. 842-1400)'
        },
        {
          'value':'frr',
          'label':'North Frisian'
        },
        {
          'value':'frs',
          'label':'East Frisian'
        },
        {
          'value':'fry',
          'label':'Friesian'
        },
        {
          'value':'ful',
          'label':'Fula'
        },
        {
          'value':'fur',
          'label':'Friulian'
        },
        {
          'value':'gaa',
          'label':'Ga'
        },
        {
          'value':'gay',
          'label':'Gayo'
        },
        {
          'value':'gba',
          'label':'Gbaya'
        },
        {
          'value':'gem',
          'label':'Germanic (Other)'
        },
        {
          'value':'geo',
          'label':'Georgian'
        },
        {
          'value':'ger',
          'label':'German'
        },
        {
          'value':'gez',
          'label':'Ethiopic'
        },
        {
          'value':'gil',
          'label':'Gilbertese'
        },
        {
          'value':'gla',
          'label':'Gaelic (Scots)'
        },
        {
          'value':'gle',
          'label':'Irish'
        },
        {
          'value':'glg',
          'label':'Galliaan'
        },
        {
          'value':'glv',
          'label':'Manx'
        },
        {
          'value':'gmh',
          'label':'German, Middle High (ca. 1050-1500)'
        },
        {
          'value':'goh',
          'label':'German, Old High (ca. 750-1050)'
        },
        {
          'value':'gon',
          'label':'Gondi'
        },
        {
          'value':'gor',
          'label':'Gorantalo'
        },
        {
          'value':'got',
          'label':'Gothic'
        },
        {
          'value':'grb',
          'label':'Grebo'
        },
        {
          'value':'grc',
          'label':'Greek, Ancient (to 1453)'
        },
        {
          'value':'gre',
          'label':'Greek, Modern (1453- )'
        },
        {
          'value':'grn',
          'label':'Guarani'
        },
        {
          'value':'gsw',
          'label':'Swiss German'
        },
        {
          'value':'guj',
          'label':'Gujarati'
        },
        {
          'value':'gwi',
          'label':"Gwich'in"
        },
        {
          'value':'hai',
          'label':'Haida'
        },
        {
          'value':'hat',
          'label':'Haitian French Creole'
        },
        {
          'value':'hau',
          'label':'Hausa'
        },
        {
          'value':'haw',
          'label':'Hawaiian'
        },
        {
          'value':'heb',
          'label':'Hebrew'
        },
        {
          'value':'her',
          'label':'Herero'
        },
        {
          'value':'hil',
          'label':'Hiligaynon'
        },
        {
          'value':'him',
          'label':'Himachali'
        },
        {
          'value':'hin',
          'label':'Hindi'
        },
        {
          'value':'hit',
          'label':'Hittite'
        },
        {
          'value':'hmn',
          'label':'Hmong'
        },
        {
          'value':'hmo',
          'label':'Hiri Motu'
        },
        {
          'value':'hrv',
          'label':'Croatian'
        },
        {
          'value':'hsb',
          'label':'Upper Sorbian'
        },
        {
          'value':'hun',
          'label':'Hungarian'
        },
        {
          'value':'hup',
          'label':'Hupa'
        },
        {
          'value':'iba',
          'label':'Iban'
        },
        {
          'value':'ibo',
          'label':'Igbo'
        },
        {
          'value':'ice',
          'label':'Icelandic'
        },
        {
          'value':'ido',
          'label':'Ido'
        },
        {
          'value':'iii',
          'label':'Sichuan Yi'
        },
        {
          'value':'ijo',
          'label':'Ijo'
        },
        {
          'value':'iku',
          'label':'Inuktitut'
        },
        {
          'value':'ile',
          'label':'Interlingue'
        },
        {
          'value':'ilo',
          'label':'Iloko'
        },
        {
          'value':'ina',
          'label':'Interlingua (International Auxiliary Language Association)'
        },
        {
          'value':'inc',
          'label':'Indic (Other)'
        },
        {
          'value':'ind',
          'label':'Indonesian'
        },
        {
          'value':'ine',
          'label':'Indo-European  (Other)'
        },
        {
          'value':'inh',
          'label':'Ingush'
        },
        {
          'value':'ipk',
          'label':'Inupiaq'
        },
        {
          'value':'ira',
          'label':'Iranian (Other)'
        },
        {
          'value':'iro',
          'label':'Iroquoian (other)'
        },
        {
          'value':'ita',
          'label':'Italian'
        },
        {
          'value':'jav',
          'label':'Javanese'
        },
        {
          'value':'jbo',
          'label':'Lojban (Artificial language)'
        },
        {
          'value':'jpn',
          'label':'Japanese'
        },
        {
          'value':'jpr',
          'label':'Judeo-Persian'
        },
        {
          'value':'jrb',
          'label':'Judeo-Arabic'
        },
        {
          'value':'kaa',
          'label':'Kara-Kalpak'
        },
        {
          'value':'kab',
          'label':'Kabyle'
        },
        {
          'value':'kac',
          'label':'Kachin'
        },
        {
          'value':'kal',
          'label':'Kalâtdlisut'
        },
        {
          'value':'kam',
          'label':'Kamba'
        },
        {
          'value':'kan',
          'label':'Kannada'
        },
        {
          'value':'kar',
          'label':'Karen'
        },
        {
          'value':'kas',
          'label':'Kashmiri'
        },
        {
          'value':'kau',
          'label':'Kanuri'
        },
        {
          'value':'kaw',
          'label':'Kawi'
        },
        {
          'value':'kaz',
          'label':'Kazakh'
        },
        {
          'value':'kbd',
          'label':'Kabardian'
        },
        {
          'value':'kha',
          'label':'Khasi'
        },
        {
          'value':'khi',
          'label':'Khoisan (Other)'
        },
        {
          'value':'khm',
          'label':'Khmer'
        },
        {
          'value':'kho',
          'label':'Khotanese'
        },
        {
          'value':'kik',
          'label':'Kikuyu'
        },
        {
          'value':'kin',
          'label':'Kinyarwanda'
        },
        {
          'value':'kir',
          'label':'Kyrghyz'
        },
        {
          'value':'kmb',
          'label':'Kimbundu'
        },
        {
          'value':'kok',
          'label':'Konkani'
        },
        {
          'value':'kom',
          'label':'Komi'
        },
        {
          'value':'kon',
          'label':'Kongo'
        },
        {
          'value':'kor',
          'label':'Korean'
        },
        {
          'value':'kos',
          'label':'Kusaie'
        },
        {
          'value':'kpe',
          'label':'Kpelle'
        },
        {
          'value':'krc',
          'label':'Karachay-Balkar'
        },
        {
          'value':'krl',
          'label':'Karelian'
        },
        {
          'value':'kro',
          'label':'Kru'
        },
        {
          'value':'kru',
          'label':'Kurukh'
        },
        {
          'value':'kua',
          'label':'Kuanyama'
        },
        {
          'value':'kum',
          'label':'Kumyk'
        },
        {
          'value':'kur',
          'label':'Kurdish'
        },
        {
          'value':'kut',
          'label':'Kutenai'
        },
        {
          'value':'lad',
          'label':'Ladino'
        },
        {
          'value':'lah',
          'label':'Lahnda'
        },
        {
          'value':'lam',
          'label':'Lamba'
        },
        {
          'value':'lao',
          'label':'Lao'
        },
        {
          'value':'lat',
          'label':'Latin'
        },
        {
          'value':'lav',
          'label':'Latvian'
        },
        {
          'value':'lez',
          'label':'Lezgian'
        },
        {
          'value':'lim',
          'label':'Limburgish'
        },
        {
          'value':'lin',
          'label':'Lingala'
        },
        {
          'value':'lit',
          'label':'Lithuanian'
        },
        {
          'value':'lol',
          'label':'Mongo-Nkundu'
        },
        {
          'value':'loz',
          'label':'Lozi'
        },
        {
          'value':'ltz',
          'label':'Letzeburgesch'
        },
        {
          'value':'lua',
          'label':'Luba-Lulua'
        },
        {
          'value':'lub',
          'label':'Luba-Katanga'
        },
        {
          'value':'lug',
          'label':'Ganda'
        },
        {
          'value':'lui',
          'label':'Luiseno'
        },
        {
          'value':'lun',
          'label':'Lunda'
        },
        {
          'value':'luo',
          'label':'Luo (Kenya and Tanzania)'
        },
        {
          'value':'lus',
          'label':'Lushai'
        },
        {
          'value':'mac',
          'label':'Macedonian'
        },
        {
          'value':'mad',
          'label':'Madurese'
        },
        {
          'value':'mag',
          'label':'Magahi'
        },
        {
          'value':'mah',
          'label':'Marshall'
        },
        {
          'value':'mai',
          'label':'Maithili'
        },
        {
          'value':'mak',
          'label':'Makasar'
        },
        {
          'value':'mal',
          'label':'Malayalam'
        },
        {
          'value':'man',
          'label':'Mandingo'
        },
        {
          'value':'mao',
          'label':'Maori'
        },
        {
          'value':'map',
          'label':'Austronesian (Other)'
        },
        {
          'value':'mar',
          'label':'Marathi'
        },
        {
          'value':'mas',
          'label':'Masai'
        },
        {
          'value':'may',
          'label':'Malay'
        },
        {
          'value':'mdf',
          'label':'Moksha'
        },
        {
          'value':'mdr',
          'label':'Mandar'
        },
        {
          'value':'men',
          'label':'Mende'
        },
        {
          'value':'mga',
          'label':'Irish, Middle(ca.1100-1500)'
        },
        {
          'value':'mic',
          'label':'Micmac'
        },
        {
          'value':'min',
          'label':'Minangkabau'
        },
        {
          'value':'mis',
          'label':'Miscellaneous languages'
        },
        {
          'value':'mkh',
          'label':'Mon-Khmer (Other)'
        },
        {
          'value':'mlg',
          'label':'Malagasy'
        },
        {
          'value':'mlt',
          'label':'Maltese'
        },
        {
          'value':'mnc',
          'label':'Manchu'
        },
        {
          'value':'mni',
          'label':'Manipuri'
        },
        {
          'value':'mno',
          'label':'Manobo languages'
        },
        {
          'value':'moh',
          'label':'Mohawk'
        },
        {
          'value':'mon',
          'label':'Mongolian'
        },
        {
          'value':'mos',
          'label':'Moore'
        },
        {
          'value':'mul',
          'label':'Multiple languages'
        },
        {
          'value':'mun',
          'label':'Munda (Other)'
        },
        {
          'value':'mus',
          'label':'Creek'
        },
        {
          'value':'mwl',
          'label':'Mirandese'
        },
        {
          'value':'mwr',
          'label':'Marwari'
        },
        {
          'value':'myn',
          'label':'Mayan languages'
        },
        {
          'value':'myv',
          'label':'Erzya'
        },
        {
          'value':'nah',
          'label':'Nahuati'
        },
        {
          'value':'nai',
          'label':'North American Indian (Other)'
        },
        {
          'value':'nap',
          'label':'Neapolitan Italian'
        },
        {
          'value':'nau',
          'label':'Nauru'
        },
        {
          'value':'nav',
          'label':'Navajo'
        },
        {
          'value':'nbl',
          'label':'Ndebele (South Africa)'
        },
        {
          'value':'nde',
          'label':'Ndebele (Zimbabwe)'
        },
        {
          'value':'ndo',
          'label':'Ndonga'
        },
        {
          'value':'nds',
          'label':'Low German'
        },
        {
          'value':'nep',
          'label':'Nepali'
        },
        {
          'value':'new',
          'label':'Newari'
        },
        {
          'value':'nia',
          'label':'Nias'
        },
        {
          'value':'nic',
          'label':'Niger-Kordofanian (Other)'
        },
        {
          'value':'niu',
          'label':'Niuean'
        },
        {
          'value':'nno',
          'label':'Nynorsk'
        },
        {
          'value':'nob',
          'label':'Bokmal'
        },
        {
          'value':'nog',
          'label':'Nogai'
        },
        {
          'value':'non',
          'label':'Old Norse'
        },
        {
          'value':'nor',
          'label':'Norwegian'
        },
        {
          'value':'nqo',
          'label':"N'Ko"
        },
        {
          'value':'nso',
          'label':'Northern Sotho'
        },
        {
          'value':'nub',
          'label':'Midob'
        },
        {
          'value':'nwc',
          'label':'Newari, Old'
        },
        {
          'value':'nya',
          'label':'Nyanja'
        },
        {
          'value':'nym',
          'label':'Nyamwezi'
        },
        {
          'value':'nyn',
          'label':'Nyankole'
        },
        {
          'value':'nyo',
          'label':'Nyoro'
        },
        {
          'value':'nzi',
          'label':'Nzima'
        },
        {
          'value':'oci',
          'label':'Occitan (post-1500)'
        },
        {
          'value':'oji',
          'label':'Ojibwa'
        },
        {
          'value':'ori',
          'label':'Oriya'
        },
        {
          'value':'orm',
          'label':'Oromo'
        },
        {
          'value':'osa',
          'label':'Osage'
        },
        {
          'value':'oss',
          'label':'Ossetic'
        },
        {
          'value':'ota',
          'label':'Turkish, Ottoman'
        },
        {
          'value':'oto',
          'label':'Otomian languages'
        },
        {
          'value':'paa',
          'label':'Papuan-Australian (Other)'
        },
        {
          'value':'pag',
          'label':'Pangasinan'
        },
        {
          'value':'pal',
          'label':'Pahlavi'
        },
        {
          'value':'pam',
          'label':'Pampanga'
        },
        {
          'value':'pan',
          'label':'Panjabi'
        },
        {
          'value':'pap',
          'label':'Papuan-New Guinea languages'
        },
        {
          'value':'pau',
          'label':'Palauan'
        },
        {
          'value':'peo',
          'label':'Old Persian (ca. 600-400 B.C.)'
        },
        {
          'value':'per',
          'label':'Persian'
        },
        {
          'value':'phi',
          'label':'Philippine (other)'
        },
        {
          'value':'phn',
          'label':'Phoenician'
        },
        {
          'value':'pli',
          'label':'Pali'
        },
        {
          'value':'pol',
          'label':'Polish'
        },
        {
          'value':'pon',
          'label':'Ponape'
        },
        {
          'value':'por',
          'label':'Portuguese'
        },
        {
          'value':'pra',
          'label':'Prakrit languages'
        },
        {
          'value':'pro',
          'label':'Provencal, Old (to 1500)'
        },
        {
          'value':'pus',
          'label':'Pushto'
        },
        {
          'value':'que',
          'label':'Quechua'
        },
        {
          'value':'raj',
          'label':'Rajasthani'
        },
        {
          'value':'rap',
          'label':'Raponui'
        },
        {
          'value':'rar',
          'label':'Rarotongan'
        },
        {
          'value':'roa',
          'label':'Romance (Other)'
        },
        {
          'value':'roh',
          'label':'Raeto-Romance'
        },
        {
          'value':'rom',
          'label':'Romany'
        },
        {
          'value':'rum',
          'label':'Romanian'
        },
        {
          'value':'run',
          'label':'Rundi'
        },
        {
          'value':'rup',
          'label':'Aromanian'
        },
        {
          'value':'rus',
          'label':'Russian'
        },
        {
          'value':'sad',
          'label':'Sandawe'
        },
        {
          'value':'sag',
          'label':'Sango'
        },
        {
          'value':'sah',
          'label':'Yakut'
        },
        {
          'value':'sai',
          'label':'Wayampi'
        },
        {
          'value':'sal',
          'label':'Salishan languages'
        },
        {
          'value':'sam',
          'label':'Samaritan Aramaic'
        },
        {
          'value':'san',
          'label':'Sanskrit'
        },
        {
          'value':'sas',
          'label':'Sasat'
        },
        {
          'value':'sat',
          'label':'Santali'
        },
        {
          'value':'scc',
          'label':'Serbo-Croatian (Cyrillic)'
        },
        {
          'value':'scn',
          'label':'Sicilian Italian'
        },
        {
          'value':'sco',
          'label':'Scots'
        },
        {
          'value':'sel',
          'label':'Selkup'
        },
        {
          'value':'sem',
          'label':'Semitic (Other)'
        },
        {
          'value':'sga',
          'label':'Irish, Old (to 1000)'
        },
        {
          'value':'sgn',
          'label':'Sign languages'
        },
        {
          'value':'shn',
          'label':'Shan'
        },
        {
          'value':'sid',
          'label':'Sidamo'
        },
        {
          'value':'sin',
          'label':'Sinhalese'
        },
        {
          'value':'sio',
          'label':'Siouan (other)'
        },
        {
          'value':'sit',
          'label':'Sino-Tibetan (Other)'
        },
        {
          'value':'sla',
          'label':'Slavic (Other)'
        },
        {
          'value':'slo',
          'label':'Slovak'
        },
        {
          'value':'slv',
          'label':'Slovenian'
        },
        {
          'value':'sma',
          'label':'Southern Sami'
        },
        {
          'value':'sme',
          'label':'Northern Sami'
        },
        {
          'value':'smi',
          'label':'Sami'
        },
        {
          'value':'smj',
          'label':'Lule Sami'
        },
        {
          'value':'smn',
          'label':'Inari Sami'
        },
        {
          'value':'smo',
          'label':'Samoan'
        },
        {
          'value':'sms',
          'label':'Skolt Sami'
        },
        {
          'value':'sna',
          'label':'Shona'
        },
        {
          'value':'snd',
          'label':'Sindhi'
        },
        {
          'value':'snk',
          'label':'Soninke'
        },
        {
          'value':'sog',
          'label':'Sogdian'
        },
        {
          'value':'som',
          'label':'Somali'
        },
        {
          'value':'son',
          'label':'Songhai'
        },
        {
          'value':'sot',
          'label':'Sotho'
        },
        {
          'value':'spa',
          'label':'Spanish'
        },
        {
          'value':'srd',
          'label':'Sardinian'
        },
        {
          'value':'srn',
          'label':'Sranan'
        },
        {
          'value':'srp',
          'label':'Serbian'
        },
        {
          'value':'srr',
          'label':'Serer'
        },
        {
          'value':'ssa',
          'label':'Nilo-Saharan (Other)'
        },
        {
          'value':'ssw',
          'label':'Swazi'
        },
        {
          'value':'suk',
          'label':'Sukuma'
        },
        {
          'value':'sun',
          'label':'Sundanese'
        },
        {
          'value':'sus',
          'label':'Susu'
        },
        {
          'value':'sux',
          'label':'Sumerian'
        },
        {
          'value':'swa',
          'label':'Swahili'
        },
        {
          'value':'swe',
          'label':'Swedish'
        },
        {
          'value':'syc',
          'label':'Classical Syriac'
        },
        {
          'value':'syr',
          'label':'Syriac'
        },
        {
          'value':'tah',
          'label':'Tahitian'
        },
        {
          'value':'tai',
          'label':'Tai (other)'
        },
        {
          'value':'tam',
          'label':'Tamil'
        },
        {
          'value':'tat',
          'label':'Tatar'
        },
        {
          'value':'tel',
          'label':'Telugu'
        },
        {
          'value':'tem',
          'label':'Temne'
        },
        {
          'value':'ter',
          'label':'Terera'
        },
        {
          'value':'tet',
          'label':'Tetum'
        },
        {
          'value':'tgk',
          'label':'Tajik'
        },
        {
          'value':'tgl',
          'label':'Tagalog'
        },
        {
          'value':'tha',
          'label':'Thai'
        },
        {
          'value':'tib',
          'label':'Tibetan'
        },
        {
          'value':'tig',
          'label':'Tigre'
        },
        {
          'value':'tir',
          'label':'Tigrinya'
        },
        {
          'value':'tiv',
          'label':'Tiv'
        },
        {
          'value':'tkl',
          'label':'Tokebuan'
        },
        {
          'value':'tlh',
          'label':'Klingon (Artificial language)'
        },
        {
          'value':'tli',
          'label':'Tlingit'
        },
        {
          'value':'tmh',
          'label':'Tamashek'
        },
        {
          'value':'tog',
          'label':'Tonga (Nyasa)'
        },
        {
          'value':'ton',
          'label':'Tonga (Tonga Islands)'
        },
        {
          'value':'tpi',
          'label':'Tok Pisin'
        },
        {
          'value':'tsi',
          'label':'Tsimshian'
        },
        {
          'value':'tsn',
          'label':'Tswana'
        },
        {
          'value':'tso',
          'label':'Tsonga'
        },
        {
          'value':'tuk',
          'label':'Turkmen'
        },
        {
          'value':'tum',
          'label':'Tumbuka'
        },
        {
          'value':'tup',
          'label':'Tupi languages'
        },
        {
          'value':'tur',
          'label':'Turkish'
        },
        {
          'value':'tut',
          'label':'Altaic (Other)'
        },
        {
          'value':'tvl',
          'label':'Tuvalu'
        },
        {
          'value':'twi',
          'label':'Twi'
        },
        {
          'value':'tyv',
          'label':'Tuvinian'
        },
        {
          'value':'udm',
          'label':'Udmurt'
        },
        {
          'value':'uga',
          'label':'Ugaritic'
        },
        {
          'value':'uig',
          'label':'Uighur'
        },
        {
          'value':'ukr',
          'label':'Ukrainian'
        },
        {
          'value':'umb',
          'label':'Umbundu'
        },
        {
          'value':'und',
          'label':'Undetermined'
        },
        {
          'value':'urd',
          'label':'Urdu'
        },
        {
          'value':'uzb',
          'label':'Uzbek'
        },
        {
          'value':'vai',
          'label':'Vai'
        },
        {
          'value':'ven',
          'label':'Venda'
        },
        {
          'value':'vie',
          'label':'Vietnamese'
        },
        {
          'value':'vol',
          'label':'Volapük'
        },
        {
          'value':'vot',
          'label':'Votic'
        },
        {
          'value':'wak',
          'label':'Wakashan languages'
        },
        {
          'value':'wal',
          'label':'Walamo'
        },
        {
          'value':'war',
          'label':'Waray'
        },
        {
          'value':'was',
          'label':'Washo'
        },
        {
          'value':'wel',
          'label':'Welsh'
        },
        {
          'value':'wen',
          'label':'Sorbian languages'
        },
        {
          'value':'wln',
          'label':'Walloon'
        },
        {
          'value':'wol',
          'label':'Wolof'
        },
        {
          'value':'xal',
          'label':'Oirat'
        },
        {
          'value':'xho',
          'label':'Xhosa'
        },
        {
          'value':'yao',
          'label':'Yao (Africa)'
        },
        {
          'value':'yap',
          'label':'Yapese'
        },
        {
          'value':'yid',
          'label':'Yiddish'
        },
        {
          'value':'yor',
          'label':'Yoruba'
        },
        {
          'value':'ypk',
          'label':'Yupik languages'
        },
        {
          'value':'zap',
          'label':'Zapotec'
        },
        {
          'value':'zbl',
          'label':'Blissymbolics'
        },
        {
          'value':'zen',
          'label':'Zenaga'
        },
        {
          'value':'zha',
          'label':'Zhuang'
        },
        {
          'value':'znd',
          'label':'Zande'
        },
        {
          'value':'zul',
          'label':'Zulu'
        },
        {
          'value':'zun',
          'label':'Zu?i'
        },
        {
          'value':'zxx',
          'label':'No lang. content'
        },
        {
          'value':'zza',
          'label':'Zaza'
        }
      ]
    },
    'recordModifiedCode':{
      'name':'recordModifiedCode',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'Record not modified'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'d',
          'label':'Dashed-on information omitted'
        },
        {
          'value':'o',
          'label':'Completely romanized/printed cards romanized'
        },
        {
          'value':'r',
          'label':'Completely romanized/printed cards in script'
        },
        {
          'value':'s',
          'label':'Shortened'
        },
        {
          'value':'x',
          'label':'Missing characters'
        }
      ]
    },
    'recordCataloguingSourceCode':{
      'name':'recordCataloguingSourceCode',
      'defaultValue':'r',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'Library of Congress cataloguing'
        },
        {
          'value':'|',
          'label':'No attempt to code'
        },
        {
          'value':'a',
          'label':'National Agricultural Library'
        },
        {
          'value':'b',
          'label':'National Library of Medecine'
        },
        {
          'value':'c',
          'label':'Cooperative cataloguing'
        },
        {
          'value':'d',
          'label':'Other institution cataloguing'
        },
        {
          'value':'e',
          'label':'Library of Congress cooperative cataloguing program'
        },
        {
          'value':'n',
          'label':'Report to new serial titles'
        },
        {
          'value':'r',
          'label':'Reporting library'
        },
        {
          'value':'u',
          'label':'Unknown source of cataloguing'
        }
      ]
    }
  }
});
