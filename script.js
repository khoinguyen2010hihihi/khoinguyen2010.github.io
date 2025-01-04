const coInput = document.querySelector("#co");
const heInput = document.querySelector("#he");
const wiInput = document.querySelector("#wi");
const sendBtn = document.querySelector("#send-btn");
const box = document.querySelector("#box");

sendBtn.addEventListener("click", function(){
  // const color = coInput.value;
  // const height = heInput.value;
  // const width = wiInput.value;

  // if (color && height > 0 && width > 0) {
  //   box.style.backgroundColor = color;
  //   box.style.height = `${height}px`;
  //   box.style.width = `${width}px`;
  // } else {
  //   alert("Vui lòng nhập đủ và chính xác tất cả các thông tin.");
  // }

  const coOutput = coInput.value;
  const heOutput = heInput.value;
  const wiOutput = wiInput.value;

  if((coOutput != null) && (heOutput != null) && (wiOutput != null)){
    box.style.backgroundColor = `${coOutput}`;
    box.style.height = heOutput + "px";
    box.style.width = wiOutput + "px";
  }
  else{
    alert("Vui lòng nhập đủ và chính xác tất cả các thông tin.")
  }
}
);
