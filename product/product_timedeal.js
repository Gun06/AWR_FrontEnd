const els = document.querySelectorAll('.time_item'); // 종료날짜 데이터가 담긴 요소 가져오기
const times = [];
const calc = (seconds) => { // 초를 일,시,분,초 로 계산
    const allHour = parseInt(seconds / 3600);
    const day = String(Math.floor(allHour / 24)).padStart(2, "0");
    const hour = String(allHour % 24).padStart(2, "0");
    const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${day}일 ${hour}:${min}:${sec}`;
};

if (els && els.length > 0) {
    els.forEach((el, index) => {
        const pattern = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/;
        const end_match = el.dataset.timedealend.match(pattern);
        const endTime = end_match;

        if (endTime !== null) {
            console.log(endTime);
            let remaining = dayjs(endTime, "YYYY-MM-DD HH:mm").diff(dayjs(), "s"); // dayjs 이용해서 endTime을 초단위로 분해

            if (!endTime || endTime === '') {
                el.querySelector(".custom_icon").style.display = "none";
            }

            times[index] = {
                elementL: el,
                remaining: remaining,
                interval: null,
            }

            times[index].interval = setInterval((i) => {
                const pattern = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/;
                const start_match = el.dataset.timedealstart.match(pattern);
                const startTime = start_match;

                let start = Math.abs(dayjs(startTime, "YYYY-MM-DD HH:mm").diff(dayjs(), "s"));
                // let full = remaining + start;

                times[index].remaining -= 1; // 1초가 지날때마다 1초씩 감소하기위해 -1

                // console.log(times[index].remaining);

                let text = '';
                if (times[index].remaining > 0) {
                    // const str = calc(times[index].remaining);
                    // text = str
                    el.querySelector(".custom_icon").style.display = "block";
                } else {
                    clearInterval(times[index].interval);
                    el.querySelector(".custom_icon").style.display = "none";
                }
            }, 1000, index);
        } else {
            el.querySelector(".custom_icon").style.display = "block";
        }

    });
}