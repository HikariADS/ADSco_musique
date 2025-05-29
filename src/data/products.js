// Import images
import guitar1 from '../assets/guitar1.webp';
import guitar2 from '../assets/guitar2.webp';
import guitar3 from '../assets/guitar3.webp';
import guitar4 from '../assets/guitar4.webp';
import guitar5 from '../assets/guitar5.webp';
import guitar6 from '../assets/guitar6.webp';
import guitar7 from '../assets/guitar7.jpg';
import piano1 from '../assets/piano1.webp';
import piano2 from '../assets/piano2.webp';
import piano3 from '../assets/piano3.webp';
import piano4 from '../assets/piano4.webp';
import piano5 from '../assets/piano5.webp';
import drum1 from '../assets/drum1.webp';
import drum2 from '../assets/drum2.webp';
import drum3 from '../assets/drum3.webp';
import drum4 from '../assets/drum4.webp';
import drum5 from '../assets/drum5.webp';
import yamaha1 from '../assets/yamaha1_11zon.jpg';
import yamaha2 from '../assets/yamaha2_11zon.jpg';
import yamaha3 from '../assets/yamaha3_11zon.jpg';
import yamaha4 from '../assets/yamaha4_11zon.jpg';
import yamaha5 from '../assets/yamaha5_11zon.jpg';
import toy1 from '../assets/toy1.webp';
import toy2 from '../assets/toy2.webp';
import toy3 from '../assets/toy3.webp';
import toy4 from '../assets/toy4.webp';
import toy5 from '../assets/toy5.webp';

export const products = [
  {
    _id: '1',
    name: 'Gibson Les Paul Standard',
    description: 'Đàn guitar điện Gibson Les Paul với thân gỗ mahogany, mặt top gỗ maple, và Burstbucker pickups.',
    longDescription: `Đàn guitar điện Gibson Les Paul Standard là một tuyệt tác của nghệ thuật chế tác đàn guitar. 
    Được chế tác từ gỗ mahogany chất lượng cao cho thân đàn và mặt top maple, mang đến âm thanh đặc trưng đầy ấm áp và sustain dài. 
    Trang bị bộ pickup Burstbucker Pro cho âm thanh vintage authentic đặc trưng của Gibson.
    
    Đặc điểm nổi bật:
    - Thân đàn: Gỗ Mahogany
    - Mặt top: Gỗ Maple AA
    - Cần đàn: Mahogany
    - Mặt phím: Rosewood
    - Pickup: Burstbucker Pro (Neck & Bridge)
    - Hardware: Nickel
    - Màu sắc: Heritage Cherry Sunburst
    
    Bảo hành: 24 tháng chính hãng Gibson USA`,
    originalPrice: 89900000,
    salePrice: 79900000,
    category: 'Electric Guitar',
    brand: 'Gibson',
    image: guitar4,
    gallery: [guitar4, guitar5, guitar6, guitar7],
    rating: 4.9,
    discount: 11,
    inStock: true,
    specs: {
      'Thân đàn': 'Gỗ Mahogany',
      'Mặt top': 'Gỗ Maple AA',
      'Cần đàn': 'Mahogany',
      'Mặt phím': 'Rosewood',
      'Scale Length': '24.75"',
      'Số phím': '22 phím',
      'Pickup': 'Burstbucker Pro (Neck & Bridge)',
      'Controls': '2 Volume, 2 Tone, 3-way Switch',
      'Hardware': 'Nickel',
      'Màu sắc': 'Heritage Cherry Sunburst',
      'Xuất xứ': 'USA',
      'Phụ kiện': 'Hardcase, Dây đàn, Chìa khóa điều chỉnh'
    }
  },
  {
    _id: '2',
    name: 'Yamaha C3X Grand Piano',
    description: 'Đàn piano cơ Yamaha C3X với âm thanh tinh tế, độ hoàn thiện cao và thiết kế sang trọng.',
    longDescription: `Đàn piano cơ Yamaha C3X là một kiệt tác trong dòng CX Series của Yamaha, được thiết kế để mang đến âm thanh concert hall đỉnh cao.
    
    Đặc điểm nổi bật:
    - Chiều dài: 186cm
    - Chiều rộng: 149cm
    - Chiều cao: 101cm
    - Trọng lượng: 320kg
    - Số phím: 88 phím
    - Pedal: 3 pedal (Damper, Soft, Sostenuto)
    - Finish: Polished Ebony
    
    Công nghệ độc quyền:
    - Khung đàn: Được đúc từ thép V-Pro
    - Bộ máy: Cải tiến với độ nhạy cao
    - Dây đàn: Được sản xuất tại Đức
    - Bàn phím: Gỗ spruce tự nhiên
    
    Bảo hành: 10 năm cho khung đàn và bộ máy`,
    originalPrice: 850000000,
    salePrice: 722500000,
    category: 'Grand Piano',
    brand: 'Yamaha',
    image: yamaha1,
    gallery: [yamaha1, yamaha2, yamaha3, yamaha4, yamaha5],
    rating: 5.0,
    discount: 15,
    inStock: true,
    specs: {
      'Chiều dài': '186cm',
      'Chiều rộng': '149cm',
      'Chiều cao': '101cm',
      'Trọng lượng': '320kg',
      'Số phím': '88 phím',
      'Pedal': '3 pedal (Damper, Soft, Sostenuto)',
      'Finish': 'Polished Ebony',
      'Khung đàn': 'Thép V-Pro',
      'Dây đàn': 'Sản xuất tại Đức',
      'Bàn phím': 'Gỗ spruce tự nhiên',
      'Xuất xứ': 'Japan',
      'Bảo hành': '10 năm'
    }
  },
  {
    _id: '3',
    name: 'Roland TD-17KVX V-Drums',
    description: 'Bộ trống điện tử cao cấp với công nghệ Prismatic Sound Modeling, cảm biến chính xác.',
    longDescription: `Roland TD-17KVX là bộ trống điện tử cao cấp được thiết kế cho cả người chơi chuyên nghiệp và người học.
    
    Đặc điểm nổi bật:
    - Sound Module: TD-17 với Prismatic Sound Modeling
    - Snare: PDX-12 mesh head pad
    - Toms: 3x PDX-8 mesh head pads
    - Kick: KD-10 mesh head pad
    - Hi-Hat: VH-10 với cảm biến motion
    - Cymbals: 2x CY-12C, 1x CY-13R
    - Rack: MDS-Compact
    
    Tính năng:
    - Bluetooth audio
    - USB recording
    - 50 drum kits preset
    - Metronome tích hợp
    - Coach function
    
    Bảo hành: 24 tháng chính hãng Roland`,
    originalPrice: 42900000,
    salePrice: 37900000,
    category: 'Electronic Drums',
    brand: 'Roland',
    image: drum3,
    gallery: [drum3, drum4, drum5],
    rating: 4.8,
    discount: 12,
    inStock: true,
    specs: {
      'Sound Module': 'TD-17',
      'Snare': 'PDX-12 mesh head pad',
      'Toms': '3x PDX-8 mesh head pads',
      'Kick': 'KD-10 mesh head pad',
      'Hi-Hat': 'VH-10',
      'Cymbals': '2x CY-12C, 1x CY-13R',
      'Rack': 'MDS-Compact',
      'Kết nối': 'USB, MIDI, Bluetooth',
      'Số preset': '50 drum kits',
      'Xuất xứ': 'Malaysia',
      'Phụ kiện': 'Cáp kết nối, Manual, Khóa điều chỉnh'
    }
  },
  {
    _id: '4',
    name: 'Yamaha Kids Musical Toy Set',
    description: 'Bộ đồ chơi nhạc cụ cho trẻ em với nhiều loại nhạc cụ khác nhau.',
    longDescription: `Bộ đồ chơi nhạc cụ Yamaha dành cho trẻ em là sự kết hợp hoàn hảo giữa giáo dục và giải trí.
    
    Đặc điểm nổi bật:
    - Nhiều loại nhạc cụ trong một bộ
    - Thiết kế an toàn cho trẻ em
    - Màu sắc bắt mắt
    - Chất liệu cao cấp, không độc hại
    - Phù hợp cho trẻ từ 3 tuổi trở lên
    
    Bảo hành: 12 tháng cho các lỗi sản xuất`,
    originalPrice: 1200000,
    salePrice: 990000,
    category: 'Musical Toys',
    brand: 'Yamaha',
    image: toy1,
    gallery: [toy1, toy2, toy3, toy4, toy5],
    rating: 4.7,
    discount: 17,
    inStock: true,
    specs: {
      'Độ tuổi phù hợp': 'Từ 3 tuổi trở lên',
      'Chất liệu': 'Nhựa ABS cao cấp',
      'Các nhạc cụ': 'Trống, Kèn, Xylophone, Tambourine',
      'Màu sắc': 'Đa màu sắc',
      'Xuất xứ': 'Indonesia',
      'Chứng nhận': 'Đạt tiêu chuẩn an toàn cho trẻ em'
    }
  },
  {
    _id: 'sm7b',
    name: 'Shure SM7B Microphone',
    description: 'Micro thu âm chuyên nghiệp Shure SM7B',
    longDescription: `Micro thu âm chuyên nghiệp Shure SM7B là lựa chọn hàng đầu cho các studio thu âm và podcast.
    
    Đặc điểm nổi bật:
    - Chất lượng âm thanh studio chuyên nghiệp
    - Thiết kế chống rung tốt
    - Lọc âm và chống nhiễu điện từ
    - Phù hợp cho vocal và speech
    - Kèm theo windscreen và mount bracket
    
    Bảo hành: 24 tháng chính hãng Shure`,
    originalPrice: 12900000,
    salePrice: 9900000,
    category: 'Microphone',
    brand: 'Shure',
    image: guitar1,
    gallery: [guitar1, guitar2],
    rating: 5.0,
    discount: 23,
    inStock: true,
    specs: {
      'Loại': 'Dynamic Microphone',
      'Pattern': 'Cardioid',
      'Frequency Response': '50 Hz - 20 kHz',
      'Impedance': '150 ohms',
      'Connector': 'XLR',
      'Xuất xứ': 'USA',
      'Phụ kiện': 'Windscreen, Mount bracket'
    }
  },
  {
    _id: 'strat',
    name: 'Fender Player Stratocaster',
    description: 'Đàn guitar điện Fender Player Stratocaster với âm thanh đặc trưng của dòng Strat',
    longDescription: `Fender Player Stratocaster là một trong những cây đàn guitar điện được yêu thích nhất của Fender.
    
    Đặc điểm nổi bật:
    - Thân đàn Alder
    - Cần đàn Maple
    - 3 Single-coil pickups
    - Cầu tremolo 2-point
    - Finish: Sunburst
    
    Bảo hành: 24 tháng chính hãng Fender`,
    originalPrice: 25900000,
    salePrice: 22900000,
    category: 'Electric Guitar',
    brand: 'Fender',
    image: guitar3,
    gallery: [guitar3, guitar4],
    rating: 5.0,
    discount: 12,
    inStock: true,
    specs: {
      'Thân đàn': 'Alder',
      'Cần đàn': 'Maple',
      'Mặt phím': 'Maple',
      'Pickups': '3 Player Series Single-coil',
      'Controls': '1 Master Volume, 2 Tone',
      'Bridge': '2-Point Tremolo',
      'Tuners': 'Standard Cast/Sealed',
      'Finish': 'Sunburst',
      'Xuất xứ': 'Mexico'
    }
  },
  {
    _id: 'scarlett',
    name: 'Focusrite Scarlett 18i20',
    description: 'Audio Interface chuyên nghiệp Focusrite Scarlett 18i20 thế hệ thứ 3',
    longDescription: `Focusrite Scarlett 18i20 là audio interface cao cấp với 18 đầu vào và 20 đầu ra.
    
    Đặc điểm nổi bật:
    - 8 preamp mic Scarlett
    - Sample rate lên đến 192kHz
    - Độ trễ cực thấp
    - Kết nối USB-C
    - Phần mềm đi kèm phong phú
    
    Bảo hành: 24 tháng chính hãng Focusrite`,
    originalPrice: 15900000,
    salePrice: 13900000,
    category: 'Audio Interface',
    brand: 'Focusrite',
    image: piano1,
    gallery: [piano1, piano2],
    rating: 4.9,
    discount: 13,
    inStock: true,
    specs: {
      'Inputs': '8 mic/line, 2 instrument, 8 ADAT, S/PDIF',
      'Outputs': '10 line, 8 ADAT, S/PDIF',
      'Sample Rate': 'Up to 192kHz',
      'Connection': 'USB-C',
      'Included Software': 'Pro Tools | First, Ableton Live Lite',
      'Xuất xứ': 'UK',
      'Phụ kiện': 'USB cable, Power adapter'
    }
  },
  {
    _id: 'jazz-bass',
    name: 'Fender American Ultra Jazz Bass',
    description: 'Đàn bass điện Fender American Ultra Jazz Bass với nhiều cải tiến hiện đại',
    longDescription: `Fender American Ultra Jazz Bass là phiên bản cao cấp nhất của dòng Jazz Bass.
    
    Đặc điểm nổi bật:
    - Thân đàn Alder premium
    - Cần đàn Modern D
    - Ultra Noiseless Vintage Jazz Bass pickups
    - Cầu HiMass Vintage
    - Finish: Ultra Burst
    
    Bảo hành: 24 tháng chính hãng Fender USA`,
    originalPrice: 55900000,
    salePrice: 49900000,
    category: 'Bass Guitar',
    brand: 'Fender',
    image: guitar5,
    gallery: [guitar5, guitar6],
    rating: 4.9,
    discount: 11,
    inStock: true,
    specs: {
      'Thân đàn': 'Alder Premium',
      'Cần đàn': 'Modern D Maple',
      'Mặt phím': 'Rosewood',
      'Pickups': 'Ultra Noiseless Vintage Jazz Bass',
      'Bridge': 'HiMass Vintage',
      'Controls': '2 Volume, 1 Tone',
      'Finish': 'Ultra Burst',
      'Xuất xứ': 'USA',
      'Phụ kiện': 'Hardcase, Dây đàn, Certificate'
    }
  },
  {
    _id: 'at2020',
    name: 'Audio-Technica AT2020',
    description: 'Micro thu âm condenser Audio-Technica AT2020',
    longDescription: `Micro thu âm condenser Audio-Technica AT2020 là lựa chọn tuyệt vời cho home studio.
    
    Đặc điểm nổi bật:
    - Màng thu low-mass
    - Pattern cardioid
    - Xử lý được SPL cao
    - Noise thấp
    - Chất lượng build tốt
    
    Bảo hành: 12 tháng chính hãng Audio-Technica`,
    originalPrice: 3900000,
    salePrice: 3900000,
    category: 'Microphone',
    brand: 'Audio-Technica',
    image: drum1,
    gallery: [drum1, drum2],
    rating: 4.7,
    discount: 0,
    inStock: true,
    specs: {
      'Element': 'Fixed-charge back plate condenser',
      'Polar Pattern': 'Cardioid',
      'Frequency Response': '20-20,000 Hz',
      'Max SPL': '144 dB',
      'Impedance': '100 ohms',
      'Connector': 'XLR',
      'Xuất xứ': 'Japan',
      'Phụ kiện': 'Stand mount, Soft case'
    }
  },
  {
    _id: 'ath-m50x',
    name: 'Audio-Technica ATH-M50x',
    description: 'Tai nghe kiểm âm Audio-Technica ATH-M50x Professional Monitor Headphones',
    longDescription: `Tai nghe kiểm âm Audio-Technica ATH-M50x là lựa chọn phổ biến trong các studio.
    
    Đặc điểm nổi bật:
    - Driver 45mm
    - Dải tần số rộng
    - Cách âm tốt
    - Có thể gập gọn
    - Dây có thể tháo rời
    
    Bảo hành: 12 tháng chính hãng Audio-Technica`,
    originalPrice: 4900000,
    salePrice: 4900000,
    category: 'Headphones',
    brand: 'Audio-Technica',
    image: drum3,
    gallery: [drum3, drum4],
    rating: 4.8,
    discount: 0,
    inStock: true,
    specs: {
      'Driver': '45mm',
      'Frequency Response': '15-28,000 Hz',
      'Impedance': '38 ohms',
      'Weight': '285g',
      'Cable': 'Detachable (3 cables included)',
      'Xuất xứ': 'Japan',
      'Phụ kiện': '3 cables, 6.3mm adapter, Carrying pouch'
    }
  },
  {
    _id: 'tele',
    name: 'Fender American Professional II Telecaster',
    description: 'Đàn guitar điện Fender American Professional II Telecaster',
    longDescription: `Fender American Professional II Telecaster là phiên bản nâng cấp của dòng Telecaster huyền thoại.
    
    Đặc điểm nổi bật:
    - Thân đàn Alder
    - Cần đàn Deep C
    - V-Mod II single-coil pickups
    - Cầu 3-saddle
    - Finish: 3-Color Sunburst
    
    Bảo hành: 24 tháng chính hãng Fender USA`,
    originalPrice: 45900000,
    salePrice: 45900000,
    category: 'Electric Guitar',
    brand: 'Fender',
    image: guitar7,
    gallery: [guitar7, guitar1],
    rating: 4.9,
    discount: 0,
    inStock: true,
    specs: {
      'Thân đàn': 'Alder',
      'Cần đàn': 'Maple Deep C',
      'Mặt phím': 'Maple',
      'Pickups': 'V-Mod II Single-coil',
      'Bridge': '3-Saddle Telecaster',
      'Controls': 'Master Volume, Tone',
      'Finish': '3-Color Sunburst',
      'Xuất xứ': 'USA',
      'Phụ kiện': 'Hardcase, Certificate'
    }
  }
];

export default products; 