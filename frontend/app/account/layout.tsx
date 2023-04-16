"use client";
import { RequireAuthentication } from "../(components)/require-authentication";

import { WithNavigation } from "../(navigation)/Navigation";

export default RequireAuthentication(0)(WithNavigation());
// export default RequireAuthentication(0)(UseNavigation());
