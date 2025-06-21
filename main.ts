import { emojis } from './emoji'; // webpack.config.js의 resolve설정 덕에 확장자 없이 import할 수 있어요.
import { format } from 'date-fns';

document.addEventListener('DOMContentLoaded', function () {
  const today = new Date();
  const formattedDate = format(today, 'MMMM d, yyyy');
  document.getElementById('dateDisplay')!.textContent = formattedDate; // 타입 문제를 임시로 해결해요

  showRandomEmoji();
});

function showRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const selectedEmoji = emojis[randomIndex];

  document.getElementById('emojiDisplay')!.textContent = selectedEmoji.icon; // 타입 문제를 임시로 해결해요
  document.getElementById('emojiName')!.textContent = selectedEmoji.name; // 타입 문제를 임시로 해결해요
}