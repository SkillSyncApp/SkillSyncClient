import { atom, selector } from "recoil";
import { User } from "../../types/User";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom<User>({
    key: 'user',
    default: undefined,
    effects_UNSTABLE: [persistAtom],
});

export const userIdSelector = selector<User['_id']>({
    key: 'userId',
    get: ({ get }) => {
        return get(userState)._id;
    }
});