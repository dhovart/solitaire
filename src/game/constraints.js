const black = ['♠', '♣'];
const red = ['♥', '♦'];

export const matchingTableauxCards = (card, otherCard) => {
  const ofOppositeColor = black.includes(card.suit) ?
    red.includes(otherCard.suit) :
    black.includes(otherCard.suit);
  return ofOppositeColor && otherCard.value === card.value - 1;
};

export const matchingFoundationCards = (card, otherCard) =>
  card.suit === otherCard.suit &&
  card.value === otherCard.value - 1;
