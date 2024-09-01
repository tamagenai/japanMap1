// const maps = ["../map-polygon.svg", "../map-circle.svg", "../map-mobile.svg", "../map-full.svg"]
const maps = ["map-full.svg"]
const containers = document.querySelectorAll('.map')
const synth = window.speechSynthesis;
const prefNames = [
  {}
];

maps.forEach(async (map, index) => {
  const res = await fetch(map)

  if (res.ok) {
    const svg = await res.text()
    containers[index].innerHTML = svg
    const prefs = document.querySelectorAll('.geolonia-svg-map .prefecture')

    prefs.forEach((pref) => {
      pref.addEventListener('mouseover', (event) => {
        event.currentTarget.style.fill = "#ff0000"
      })
      pref.addEventListener('mouseleave', (event) => {
        event.currentTarget.style.fill = ""
      })
      // マウスクリック時のイベント
      pref.addEventListener('click', (event) => {
        console.log(event.currentTarget.classList[0]);
        console.log(event.currentTarget.firstElementChild.innerHTML);
        const prefNames = event.currentTarget.firstElementChild.innerHTML;
        let wtitle1;
        let wtitle2;
        [wtitle1, wtitle2] = fncTitleBunnkai(prefNames);
        speakText2(wtitle1);
        
      })
    })
  }
});
// タイトル分解
function fncTitleBunnkai(titleString) {
  const cstSlash = "/";
  let wtitle1;
  let wtitle2;
  let wtitle = titleString.split(cstSlash);
  wtitle1 = wtitle[0];
  wtitle2 = wtitle[1];
  return [wtitle1, wtitle2];

}
// テキストを音声に変換して再生する関数
function speakText2(text) {

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CH'; // 日本語の言語コード
  synth.speak(utterance);
}
