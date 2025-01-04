const coInput = document.querySelector("#co");
const heInput = document.querySelector("#he");
const wiInput = document.querySelector("#wi");
const sendBtn = document.querySelector("#send-btn");
const box = document.querySelector("#box");

sendBtn.addEventListener("click", function(){
  const coOutput = coInput.value;
  const heOutput = heInput.value;
  const wiOutput = wiInput.value;

  if(!coOutput || !heOutput || !wiOutput){
    alert("Vui lòng nhập đủ và chính xác tất cả các thông tin.")
  }
  else{
    box.style.backgroundColor = `${coOutput}`;
    box.style.height = heOutput + "px";
    box.style.width = wiOutput + "px";
  }
}
);