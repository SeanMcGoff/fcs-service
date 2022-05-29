import { CauseArea } from "@prisma/client";

function beautifyCauseArea(ca: CauseArea): string {
    // turns EARLY_CHILDHOOD -> Early Childhood
    return ca.replace(/_/g, ' ').split(' ')
        .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(' ');
}

export default beautifyCauseArea
