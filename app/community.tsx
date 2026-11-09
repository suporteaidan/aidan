import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BottomArea, Card, Phone, PrimaryButton, SearchBox, TopBar } from '@/components/AidanUI';
import { reviews } from '@/data/mock';

const logo = require('../assets/aidan-logo.png');

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function CommunityScreen() {
  const [search, setSearch] = useState('');
  const filteredReviews = reviews.filter((review) => normalize(`${review.name} ${review.brand} ${review.product} ${review.price}`).includes(normalize(search)));

  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Comunidade" />
      <View style={styles.content}>
        <View style={styles.header}><Image source={logo} style={styles.logo} resizeMode="contain" /><Text style={styles.headerText}>Veja o que a comunidade{`\n`}está dizendo sobre esse{`\n`}produto</Text></View>
        <SearchBox value={search} onChangeText={setSearch} />
        <View style={styles.reviews}>
          {filteredReviews.map((review) => <Review key={review.name} {...review} />)}
          {filteredReviews.length === 0 && <Text style={styles.empty}>Nenhuma opinião encontrada</Text>}
        </View>
        <PrimaryButton label="Compartilhe sua opinião!" href="/community-share" style={styles.button} />
      </View>
      <BottomArea active="home" />
    </Phone>
  );
}

function Review({ name, price, brand, product, date, stars, image }: any) {
  return <Card style={styles.review}><Text style={styles.date}>{date}</Text><View style={styles.reviewTop}><Text style={styles.name}>{name}</Text><Text style={styles.price}>{price}</Text><Text style={styles.stars}>{stars}</Text></View><View style={styles.reviewBody}><Text style={styles.productImage}>{image}</Text><View style={{ flex: 1 }}><Text style={styles.info}>Marca: {brand}                 Produto: {product}</Text><Text style={styles.opinion}>Descreva sua opinião</Text></View></View><Text style={styles.likes}>10 👍  💬 2</Text></Card>;
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 28, paddingTop: 14, paddingBottom: 112 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  logo: { width: 84, height: 71, marginRight: 17 },
  headerText: { color: '#5865F2', fontSize: 16, lineHeight: 22, fontWeight: '900', flex: 1 },
  reviews: { marginTop: 19, gap: 11, minHeight: 256 },
  review: { height: 78, paddingHorizontal: 8, paddingVertical: 5 },
  date: { color: '#888888', fontSize: 9, textAlign: 'right' },
  reviewTop: { flexDirection: 'row', alignItems: 'center' },
  name: { color: '#4B3EFF', fontSize: 10, fontWeight: '900', width: 84 },
  price: { color: '#555555', fontSize: 9, flex: 1 },
  stars: { color: '#FFA500', fontSize: 12 },
  reviewBody: { flexDirection: 'row', alignItems: 'center' },
  productImage: { fontSize: 28, width: 48, textAlign: 'center' },
  info: { color: '#333333', fontSize: 9 },
  opinion: { color: '#999999', fontSize: 8, marginTop: 2 },
  likes: { color: '#999999', fontSize: 8, marginLeft: 8 },
  empty: { color: '#888888', fontSize: 12, textAlign: 'center', paddingVertical: 30 },
  button: { backgroundColor: '#5865F2', marginTop: 24 }
});
