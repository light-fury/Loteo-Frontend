import {useEffect} from "react";

import {REFERRAL_CODE_KEY} from "app/constants";
import {setItem} from "common/storage";

const useReferralCodeWatcher = (location: Location) => {
    useEffect(() => {
        const params = new URLSearchParams(location.search.substring(1));
        const referralCode = params.get("referral");

        if (referralCode) {
            setItem(REFERRAL_CODE_KEY, referralCode.includes("?") ? referralCode.split("?")[0] : referralCode);
        }
    }, [location.search]);
};

export default useReferralCodeWatcher;
