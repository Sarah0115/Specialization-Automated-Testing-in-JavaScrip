let expect;
let request;

const BASIC = 'Basic ' + Buffer.from('admin:password123').toString('base64');

async function timed(cb) {
    const start = Date.now();
    const res = await cb();
    const ms = Date.now() - start;
    expect(ms).to.be.lessThanOrEqual(3000);
    return res;
}

describe('Booking API - DELETE', function () {
    this.timeout(15000);
    before(async function () {
        const chai = await import('chai');
        expect = chai.expect;
        request = (await import('supertest')).default(
            'https://restful-booker.herokuapp.com'
        );
    });

    it('DELETE: delete with Basic Auth and verify 404', async () => {
        const created = await request
            .post('/booking')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', BASIC)
            .send({
                firstname: 'Mark',
                lastname: 'Lee',
                totalprice: 150,
                depositpaid: true,
                bookingdates: { checkin: '2025-10-01', checkout: '2025-10-05' },
            });
        const id = created.body.bookingid;

        const delRes = await timed(() =>
            request.delete(`/booking/${id}`).set('Authorization', BASIC)
        );

        expect([200, 201, 204]).to.include(delRes.status);

        const after = await request
            .get(`/booking/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', BASIC);

        expect(after.status).to.equal(404);
    });

    it('DELETE: negative — no auth → 401/403', async () => {
        const created = await request
            .post('/booking')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', BASIC)
            .send({
                firstname: 'Del',
                lastname: 'NoAuth',
                totalprice: 120,
                depositpaid: false,
                bookingdates: { checkin: '2025-11-10', checkout: '2025-11-12' },
            });
        const id = created.body.bookingid;

        const res = await timed(() => request.delete(`/booking/${id}`));
        expect([401, 403]).to.include(res.status);
    });
});
