let expect;
let Joi;
let request;

const BASIC = 'Basic ' + Buffer.from('admin:password123').toString('base64');

async function timed(cb) {
    const start = Date.now();
    const res = await cb();
    const ms = Date.now() - start;
    expect(ms).to.be.lessThanOrEqual(3000);
    return res;
}

describe('Booking API - POST', () => {
    before(async () => {
        const chai = await import('chai');
        expect = chai.expect;
        const joiModule = await import('joi');
        Joi = joiModule.default;
        request = (await import('supertest')).default(
            'https://restful-booker.herokuapp.com'
        );
    });

    it('POST: should create a new booking (happy path)', async () => {
        const payload = {
            firstname: 'John',
            lastname: 'Doe',
            totalprice: 111,
            depositpaid: true,
            bookingdates: { checkin: '2025-10-05', checkout: '2025-10-10' },
            additionalneeds: 'Breakfast',
        };

        const res = await timed(() =>
            request
                .post('/booking')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('Authorization', BASIC)
                .send(payload)
        );

        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.include('application/json');

        const schema = Joi.object({
            bookingid: Joi.number().required(),
            booking: Joi.object({
                firstname: Joi.string().required(),
                lastname: Joi.string().required(),
                totalprice: Joi.number().required(),
                depositpaid: Joi.boolean().required(),
                bookingdates: Joi.object({
                    checkin: Joi.string().required(),
                    checkout: Joi.string().required(),
                }).required(),
                additionalneeds: Joi.string().optional(),
            }).required(),
        }).required();

        Joi.assert(res.body, schema);
    });

    it('POST: negative — missing firstname', async () => {
        const payload = {
            lastname: 'NoFirst',
            totalprice: 50,
            depositpaid: false,
            bookingdates: { checkin: '2025-11-01', checkout: '2025-11-03' },
        };

        const res = await timed(() =>
            request
                .post('/booking')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('Authorization', BASIC)
                .send(payload)
        );

        expect([400, 500]).to.include(res.status);
    });
});
