import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function createDiscount(CID: number, OID: number, aVD: number, iR: number, cR: number, cO: Date, a: boolean): void {
	let disc: PrismaUserCreateInput
	disc = {
		CouponID: CID
		OwnerID: OID
		absoluteValueDiscount: aVD
		itemRequirement: iR
		cartRequirement: cR
		created_on: cO
		active: a
	}
	const createDiscount = await prisma.user.create({ data: disc })
}

async function readDiscount(CID: number) {
	const disc = await prisma.user.findUnique({
		where: {
			CouponID: CID
		},
	})
	return disc
}

async function deleteDiscount(CID: number): void {
	const deleteDisc = await prisma.user.delete({
		where: {
			CouponID: {
				contains: CID
			},
		},
	})
}

async function updateDiscount(field: string, num?: number, date?: Date, bool?: boolean): void {
	let types: string[] = [num,date,bool].map(typeof)
	let count: number = 0
	// checking if only 1 value to be updated is given
	for (elem of types) {
		if (elem === 'undefined')
			{
				count += 1
			}
	}

	if(count < 2) {
			// error
			return;
	}

	switch (field) {
		case 'CouponID':
			const updateDisc = await prisma.user.update({
			where: {
				CouponID: n
