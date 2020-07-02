export const isEmailValid = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const stringHash = (value: string) => {
    let hash = 5381,
        i = value.length;

    while (i) {
        hash = (hash * 33) ^ value.charCodeAt(--i);
    }

    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
     * integers. Since we want the results to be always positive, convert the
     * signed int to an unsigned by doing an unsigned bitshift. */
    return hash >>> 0;
};

export const getLimittedDecimal = (value: number, fixed: number) => {
    const data = value.toFixed(fixed).match(/^-?\d*\.?0*\d{0,1}/);
    return data ? parseFloat(data[0]) : 0;
};

export const stringArrayHash = (array: string[]) =>
    stringHash(array.reduce((combined, value) => combined + "+++" + value, ""));

export const getBaseURL = () =>
    `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}`;

export const getEURString = (value: number, showMinimumFractionDigits = false) =>
    value
        .toLocaleString("en-US", {
            currency: "EUR",
            minimumFractionDigits: showMinimumFractionDigits ? 2 : undefined,
            maximumFractionDigits: 2
        })
        .replace(/,/g, " ");

export const getETHString = (value: number) =>
    value
        .toLocaleString("en-US", {
            maximumFractionDigits: 6
        })
        .replace(/,/g, " ");

export const getBTCString = (value: number) =>
    value
        .toLocaleString("en-US", {
            maximumFractionDigits: 6
        })
        .replace(/,/g, " ");

export const getLoteuString = (value: number) =>
    value
        .toLocaleString("en-US", {
            maximumFractionDigits: 6
        })
        .replace(/,/g, " ");

export const getLotesString = (value: number) =>
    value
        .toLocaleString("en-US", {
            maximumFractionDigits: 6
        })
        .replace(/,/g, " ");

export const getNumberFormattedString = (value: number) =>
    value
        .toLocaleString("en-US", {
            maximumFractionDigits: 6
        })
        .replace(/,/g, " ");

export const isElementVisible = (element: Element, visiblePercentage: number = 2 / 3) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top + rect.height * visiblePercentage <= window.innerHeight &&
        -rect.top <= rect.height * (1 - visiblePercentage)
    );
};

export const getRemainingWeeksString = (dateUntil: Date) => {
    const days = Math.max(0, Math.ceil((dateUntil.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

    if (days < 7) {
        return `${days} day${days === 1 ? "" : "s"}`;
    } else {
        const weeks = Math.ceil(days / 7);
        return `${weeks} week${weeks === 1 ? "" : "s"}`;
    }
};

export const isETHAddressValid = (address: string) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        return true;
    }
};

export const isBTCAddressValid = (address: string) => {
    if (address.length < 26 || address.length > 35) {
        return false;
      }
      let re = /^[A-Z0-9]+$/i;
      if (!re.test(address)) {
        return false;
      }
      return true;
};

export const getRandomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const noop = () => {};

export const mobileDetector = () => {
    const ua = navigator.userAgent;
    const test1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        ua
    );
    const test2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        ua.substr(0, 4)
    );

    return test1 || test2;
};

export const camelCase = (txt: string) => txt.replace(/\W+(.)/g, ch => ch.toUpperCase()).replace(/\s+/g, "");

export const getRomanNumber = (num: number) => {
    if (typeof num !== "number") {
        console.error("The provided parameter for getRomanNumber() has an invalid data type (must be number)");
        return;
    }

    const romanNums = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    const romanNumsTranslated = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let value = num;
    let numberFormatted = "";

    romanNums.forEach((_, idx) => {
        while (value >= romanNumsTranslated[idx]) {
            value -= romanNumsTranslated[idx];
            numberFormatted += romanNums[idx];
        }
    });

    return numberFormatted;
};
