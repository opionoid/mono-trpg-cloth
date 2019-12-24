import axios from "axios";

export function sendAttackMessage(
  skill,
  isCritical: boolean,
  damage: number,
  url: string
) {
  // 0, undefined, null のときはダメージを非表示にします
  let content: string;
  if (damage) {
    content = isCritical
      ? `${skill.name} -- ${skill.description}\rクリティカル！${damage}ダメージ`
      : `${skill.name} -- ${skill.description}\r${damage}ダメージ`;
  } else {
    content = `${skill.name} -- ${skill.description}`;
  }

  const message = {
    username: "システムメッセージ",
    content: `${content}`
  };
  const messageJson = JSON.stringify(message);
  console.log(messageJson);

  axios({
    method: "POST",
    url: url,
    data: messageJson,
    headers: {
      "Access-Controll-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    }
  });
}
