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

describe('Booking API - PUT & PATCH (Basic Auth)', () => {
    before(async () => {
        const chai = await import('chai');
        expect = chai.expect;
        const joiModule = await import('joi');
        Joi = joiModule.default;
        request = (await import('supertest')).default(
            'https://restful-booker.herokuapp.com'
        );
    });

    it('PUT: full update with Basic Auth', async () => {
        const created = await request
            .post('/booking')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', BASIC)
            .send({
                firstname: 'Jane',
                lastname: 'Doe',
                totalprice: 200,
                depositpaid: false,
                bookingdates: { checkin: '2025-10-05', checkout: '2025-10-15' },
            });
        const id = created.body.bookingid;

        const res = await timed(() =>
            request
                .put(`/booking/${id}`)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('Authorization', BASIC)
                .send({
                    firstname: 'Janet',
                    lastname: 'Smith',
                    totalprice: 250,
                    depositpaid: true,
                    bookingdates: {
                        checkin: '2025-10-06',
                        checkout: '2025-10-20',
                    },
                    additionalneeds: 'Lunch',
                })
        );

        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.include('application/json');

        const schema = Joi.object({
            firstname: Joi.string().valid('Janet').required(),
            lastname: Joi.string().valid('Smith').required(),
            totalprice: Joi.number().valid(250).required(),
            depositpaid: Joi.boolean().valid(true).required(),
            bookingdates: Joi.object({
                checkin: Joi.string().required(),
                checkout: Joi.string().required(),
            }).required(),
            additionalneeds: Joi.string().optional(),
        }).required();
        Joi.assert(res.body, schema);
    });

    it('PUT: negative — no auth → 401/403', async () => {
        const created = await request
            .post('/booking')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', BASIC)
            .send({
                firstname: 'Auth',
                lastname: 'Check',
                totalprice: 100,
                depositpaid: true,
                bookingdates: { checkin: '2025-12-01', checkout: '2025-12-05' },
            });
        const id = created.body.bookingid;

        const res = await timed(() =>
            request
                .put(`/booking/${id}`)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                // no Auth
                .send({
                    firstname: 'No',
                    lastname: 'Auth',
                    totalprice: 90,
                    depositpaid: false,
                    bookingdates: {
                        checkin: '2025-12-02',
                        checkout: '2025-12-06',
                    },
                })
        );

        expect([401, 403]).to.include(res.status);
    });

    it('PATCH: partial update with Basic Auth', async () => {
        const created = await request
            .post('/booking')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', BASIC)
            .send({
                firstname: 'Pat',
                lastname: 'Ch',
                totalprice: 300,
                depositpaid: true,
                bookingdates: { checkin: '2025-10-10', checkout: '2025-10-12' },
            });
        const id = created.body.bookingid;

        const res = await timed(() =>
            request
                .patch(`/booking/${id}`)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('Authorization', BASIC)
                .send({ additionalneeds: 'Dinner' })
        );

        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.include('application/json');
        expect(res.body).to.have.property('additionalneeds', 'Dinner');
    });
});
