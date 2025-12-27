export interface TarotCard {
  id: number;
  name: string;
  arcana: 'Major';
  keywords: string[];
  upright: string;
  reversed: string;
  description: string;
}

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    arcana: "Major",
    keywords: ["Beginnings", "Innocence", "Spontaneity", "Free Spirit"],
    upright: "New beginnings, optimism, trust in life",
    reversed: "Recklessness, taken advantage of, inconsideration",
    description: "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe."
  },
  {
    id: 1,
    name: "The Magician",
    arcana: "Major",
    keywords: ["Manifestation", "Resourcefulness", "Power", "Inspired Action"],
    upright: "Manifestation, resourcefulness, power, inspired action",
    reversed: "Manipulation, poor planning, untapped talents",
    description: "The Magician is the bridge between the world of the spirit and the world of humanity. His is the ability to take the power of the Universe and make it manifest in the earthly plane."
  },
  {
    id: 2,
    name: "The High Priestess",
    arcana: "Major",
    keywords: ["Intuition", "Sacred Knowledge", "Divine Feminine", "Subconscious"],
    upright: "Intuition, sacred knowledge, divine feminine, the subconscious mind",
    reversed: "Secrets, disconnected from intuition, withdrawal and silence",
    description: "The High Priestess is the guardian of the unconscious. She sits at the threshold between the conscious and unconscious realms, offering access to sacred knowledge."
  },
  {
    id: 3,
    name: "The Empress",
    arcana: "Major",
    keywords: ["Femininity", "Beauty", "Nature", "Nurturing", "Abundance"],
    upright: "Femininity, beauty, nature, nurturing, abundance",
    reversed: "Creative block, dependence on others",
    description: "The Empress represents the abundance of life, creativity, and the birth of new ideas, products, and endeavors. She is the feminine principle of creation."
  },
  {
    id: 4,
    name: "The Emperor",
    arcana: "Major",
    keywords: ["Authority", "Establishment", "Structure", "Father Figure"],
    upright: "Authority, establishment, structure, a father figure",
    reversed: "Domination, excessive control, lack of discipline, inflexibility",
    description: "The Emperor represents authority, structure, control and fatherhood. He is the wise father figure of the Tarot who uses his authority to protect and guide."
  },
  {
    id: 5,
    name: "The Hierophant",
    arcana: "Major",
    keywords: ["Spiritual Wisdom", "Religious Beliefs", "Conformity", "Tradition"],
    upright: "Spiritual wisdom, religious beliefs, conformity, tradition, institutions",
    reversed: "Personal beliefs, freedom, challenging the status quo",
    description: "The Hierophant represents traditional values and institutions. He is the masculine counterpart to the High Priestess, representing established religious doctrine."
  },
  {
    id: 6,
    name: "The Lovers",
    arcana: "Major",
    keywords: ["Love", "Harmony", "Relationships", "Values Alignment", "Choices"],
    upright: "Love, harmony, relationships, values alignment, choices",
    reversed: "Self-love, disharmony, imbalance, misalignment of values",
    description: "The Lovers represent relationships and choices. Its appearance in a spread indicates some decision about an existing relationship, a temptation of the heart, or a choice of potential partners."
  },
  {
    id: 7,
    name: "The Chariot",
    arcana: "Major",
    keywords: ["Control", "Willpower", "Success", "Action", "Determination"],
    upright: "Control, willpower, success, action, determination",
    reversed: "Self-discipline, opposition, lack of direction",
    description: "The Chariot represents conquest, victory and overcoming opposition through your confidence and control. It reflects a strong will and determination to succeed."
  },
  {
    id: 8,
    name: "Strength",
    arcana: "Major",
    keywords: ["Strength", "Courage", "Persuasion", "Influence", "Compassion"],
    upright: "Strength, courage, persuasion, influence, compassion",
    reversed: "Inner strength, self-doubt, low energy, raw emotion",
    description: "Strength represents inner strength, courage and influence. This card suggests that you have the ability to handle whatever life throws at you through your inner resilience."
  },
  {
    id: 9,
    name: "The Hermit",
    arcana: "Major",
    keywords: ["Soul Searching", "Introspection", "Inner Guidance", "Solitude"],
    upright: "Soul searching, introspection, being alone, inner guidance",
    reversed: "Isolation, loneliness, withdrawal",
    description: "The Hermit represents introspection, searching for truth and inner guidance. He shines his light on the path ahead, illuminating the way forward through wisdom and contemplation."
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    arcana: "Major",
    keywords: ["Good Luck", "Karma", "Life Cycles", "Destiny", "Turning Point"],
    upright: "Good luck, karma, life cycles, destiny, a turning point",
    reversed: "Bad luck, resistance to change, breaking cycles",
    description: "The Wheel of Fortune represents the ever-changing cycle of life, wins and losses, ups and downs, unexpected luck, and the cyclical nature of existence."
  },
  {
    id: 11,
    name: "Justice",
    arcana: "Major",
    keywords: ["Justice", "Fairness", "Truth", "Cause and Effect", "Law"],
    upright: "Justice, fairness, truth, cause and effect, law",
    reversed: "Unfairness, lack of accountability, dishonesty",
    description: "Justice represents fairness, truth and the law. This card suggests that you will be called to account for your actions and receive what you deserve."
  },
  {
    id: 12,
    name: "The Hanged Man",
    arcana: "Major",
    keywords: ["Pause", "Surrender", "Letting Go", "New Perspectives"],
    upright: "Pause, surrender, letting go, new perspectives",
    reversed: "Delays, resistance, stalling, indecision",
    description: "The Hanged Man represents a time of suspension and waiting. This period of pause allows you to gain new perspectives and see things from a different angle."
  },
  {
    id: 13,
    name: "Death",
    arcana: "Major",
    keywords: ["Endings", "Change", "Transformation", "Transition"],
    upright: "Endings, change, transformation, transition",
    reversed: "Resistance to change, personal transformation, inner purging",
    description: "Death represents transformation and the end of a major phase or aspect of your life that is no longer serving you, opening up the possibility of something far more valuable."
  },
  {
    id: 14,
    name: "Temperance",
    arcana: "Major",
    keywords: ["Balance", "Moderation", "Patience", "Purpose"],
    upright: "Balance, moderation, patience, purpose",
    reversed: "Imbalance, excess, self-healing, re-alignment",
    description: "Temperance represents balance, patience and moderation. This card suggests that you have found inner calm and have a good perspective on things."
  },
  {
    id: 15,
    name: "The Devil",
    arcana: "Major",
    keywords: ["Shadow Self", "Attachment", "Addiction", "Restriction", "Sexuality"],
    upright: "Shadow self, attachment, addiction, restriction, sexuality",
    reversed: "Releasing limiting beliefs, exploring dark thoughts, detachment",
    description: "The Devil represents bondage, addiction and sexuality. This card suggests that you are feeling trapped by material pleasures or unhealthy relationships."
  },
  {
    id: 16,
    name: "The Tower",
    arcana: "Major",
    keywords: ["Sudden Change", "Upheaval", "Chaos", "Revelation", "Awakening"],
    upright: "Sudden change, upheaval, chaos, revelation, awakening",
    reversed: "Personal transformation, fear of change, averting disaster",
    description: "The Tower represents sudden upheaval, broken pride, and disaster. However, it also represents the necessary destruction that leads to new growth and revelation."
  },
  {
    id: 17,
    name: "The Star",
    arcana: "Major",
    keywords: ["Hope", "Faith", "Purpose", "Renewal", "Spirituality"],
    upright: "Hope, faith, purpose, renewal, spirituality",
    reversed: "Lack of faith, despair, self-trust, disconnection",
    description: "The Star represents hope, faith and rejuvenation. After the darkness, the Star brings renewed hope and faith, and a sense that you are truly blessed by the universe."
  },
  {
    id: 18,
    name: "The Moon",
    arcana: "Major",
    keywords: ["Illusion", "Fear", "Anxiety", "Subconscious", "Intuition"],
    upright: "Illusion, fear, anxiety, subconscious, intuition",
    reversed: "Release of fear, repressed emotion, inner confusion",
    description: "The Moon represents illusion, fear and anxiety. Things are not as they seem. The Moon is a card of warning, suggesting that something is not quite right."
  },
  {
    id: 19,
    name: "The Sun",
    arcana: "Major",
    keywords: ["Positivity", "Fun", "Warmth", "Success", "Vitality"],
    upright: "Positivity, fun, warmth, success, vitality",
    reversed: "Inner child, feeling down, overly optimistic",
    description: "The Sun represents success, radiance and abundance. The Sun gives you strength and tells you that no matter where you go or what you do, your positive and radiant energy will follow you."
  },
  {
    id: 20,
    name: "Judgement",
    arcana: "Major",
    keywords: ["Judgement", "Rebirth", "Inner Calling", "Absolution"],
    upright: "Judgement, rebirth, inner calling, absolution",
    reversed: "Self-doubt, inner critic, ignoring the call",
    description: "Judgement represents reflection, reckoning and awakening. This card suggests that you are reaching a significant stage in your journey, one that brings greater self-awareness."
  },
  {
    id: 21,
    name: "The World",
    arcana: "Major",
    keywords: ["Completion", "Integration", "Accomplishment", "Travel"],
    upright: "Completion, integration, accomplishment, travel",
    reversed: "Seeking personal closure, short-cuts, delays",
    description: "The World represents completion, accomplishment and fulfillment. You have achieved your goals and completed a major life cycle. A time of celebration and success."
  }
];

// Utility function to shuffle the deck
export const shuffleDeck = (deck: TarotCard[]): TarotCard[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
