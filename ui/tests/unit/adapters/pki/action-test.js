import { module, test } from 'qunit';
import { setupTest } from 'vault/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { allowAllCapabilitiesStub } from 'vault/tests/helpers/stubs';
import { rootPem } from 'vault/tests/helpers/pki/values';

module('Unit | Adapter | pki/action', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.store = this.owner.lookup('service:store');
    this.secretMountPath = this.owner.lookup('service:secret-mount-path');
    this.backend = 'pki-test';
    this.secretMountPath.currentPath = this.backend;
    this.server.post('/sys/capabilities-self', allowAllCapabilitiesStub());
  });

  test('it exists', function (assert) {
    const adapter = this.owner.lookup('adapter:pki/action');
    assert.ok(adapter);
  });

  module('actionType import', function (hooks) {
    hooks.beforeEach(function () {
      this.payload = {
        pem_bundle: rootPem,
      };
    });

    test('it calls the correct endpoint when useIssuer = false', async function (assert) {
      assert.expect(1);

      this.server.post(`${this.backend}/config/ca`, () => {
        assert.ok(true, 'request made to correct endpoint on create');
        return {};
      });

      await this.store
        .createRecord('pki/action', this.payload)
        .save({ adapterOptions: { actionType: 'import', useIssuer: false } });
    });

    test('it calls the correct endpoint when useIssuer = true', async function (assert) {
      assert.expect(1);
      this.server.post(`${this.backend}/issuers/import/bundle`, () => {
        assert.ok(true, 'request made to correct endpoint on create');
        return {};
      });

      await this.store
        .createRecord('pki/action', this.payload)
        .save({ adapterOptions: { actionType: 'import', useIssuer: true } });
    });
  });

  module('actionType generate-root', function () {
    test('it calls the correct endpoint when useIssuer = false', async function (assert) {
      assert.expect(4);
      const adapterOptions = { adapterOptions: { actionType: 'generate-root', useIssuer: false } };
      this.server.post(`${this.backend}/root/generate/internal`, () => {
        assert.ok(true, 'request made correctly when type = internal');
        return {};
      });
      this.server.post(`${this.backend}/root/generate/exported`, () => {
        assert.ok(true, 'request made correctly when type = exported');
        return {};
      });
      this.server.post(`${this.backend}/root/generate/existing`, () => {
        assert.ok(true, 'request made correctly when type = exising');
        return {};
      });
      this.server.post(`${this.backend}/root/generate/kms`, () => {
        assert.ok(true, 'request made correctly when type = kms');
        return {};
      });

      await this.store
        .createRecord('pki/action', {
          type: 'internal',
        })
        .save(adapterOptions);
      await this.store
        .createRecord('pki/action', {
          type: 'exported',
        })
        .save(adapterOptions);
      await this.store
        .createRecord('pki/action', {
          type: 'existing',
        })
        .save(adapterOptions);
      await this.store
        .createRecord('pki/action', {
          type: 'kms',
        })
        .save(adapterOptions);
    });

    test('it calls the correct endpoint when useIssuer = true', async function (assert) {
      assert.expect(4);
      const adapterOptions = { adapterOptions: { actionType: 'generate-root', useIssuer: true } };
      this.server.post(`${this.backend}/issuers/generate/root/internal`, () => {
        assert.ok(true, 'request made correctly when type = internal');
        return {};
      });
      this.server.post(`${this.backend}/issuers/generate/root/exported`, () => {
        assert.ok(true, 'request made correctly when type = exported');
        return {};
      });
      this.server.post(`${this.backend}/issuers/generate/root/existing`, () => {
        assert.ok(true, 'request made correctly when type = exising');
        return {};
      });
      this.server.post(`${this.backend}/issuers/generate/root/kms`, () => {
        assert.ok(true, 'request made correctly when type = kms');
        return {};
      });

      await this.store
        .createRecord('pki/action', {
          type: 'internal',
        })
        .save(adapterOptions);
      await this.store
        .createRecord('pki/action', {
          type: 'exported',
        })
        .save(adapterOptions);
      await this.store
        .createRecord('pki/action', {
          type: 'existing',
        })
        .save(adapterOptions);
      await this.store
        .createRecord('pki/action', {
          type: 'kms',
        })
        .save(adapterOptions);
    });
  });

  module('actionType generate-csr', function () {
    test('it calls the correct endpoint when useIssuer = false', async function (assert) {
      assert.expect(4);
      const adapterOptions = { adapterOptions: { actionType: 'generate-csr', useIssuer: false } };
      this.server.post(`${this.backend}/intermediate/generate/internal`, () => {
        assert.ok(true, 'request made correctly when type = internal');
        return {};
      });
      this.server.post(`${this.backend}/intermediate/generate/exported`, () => {
        assert.ok(true, 'request made correctly when type = exported');
        return {};
      });
      this.server.post(`${this.backend}/intermediate/generate/existing`, () => {
        assert.ok(true, 'request made correctly when type = exising');
        return {};
      });
      this.server.post(`${this.backend}/intermediate/generate/kms`, () => {
        assert.ok(true, 'request made correctly when type = kms');
        return {};
      });

      await this.store
        .createRecord('pki/action', {
          type: 'internal',
        })
        .save(adapterOptions);
      await this.store
        .createRecord('pki/action', {
          type: 'exported',
        })
        .save(adapterOptions);
      await this.store
        .createRecord('pki/action', {
          type: 'existing',
        })
        .save(adapterOptions);
      await this.store
        .createRecord('pki/action', {
          type: 'kms',
        })
        .save(adapterOptions);
    });

    test('it calls the correct endpoint when useIssuer = true', async function (assert) {
      assert.expect(4);
      const adapterOptions = { adapterOptions: { actionType: 'generate-csr', useIssuer: true } };
      this.server.post(`${this.backend}/issuers/generate/intermediate/internal`, () => {
        assert.ok(true, 'request made correctly when type = internal');
        return {};
      });
      this.server.post(`${this.backend}/issuers/generate/intermediate/exported`, () => {
        assert.ok(true, 'request made correctly when type = exported');
        return {};
      });
      this.server.post(`${this.backend}/issuers/generate/intermediate/existing`, () => {
        assert.ok(true, 'request made correctly when type = exising');
        return {};
      });
      this.server.post(`${this.backend}/issuers/generate/intermediate/kms`, () => {
        assert.ok(true, 'request made correctly when type = kms');
        return {};
      });

      await this.store
        .createRecord('pki/action', {
          type: 'internal',
        })
        .save(adapterOptions);
      await this.store
        .createRecord('pki/action', {
          type: 'exported',
        })
        .save(adapterOptions);
      await this.store
        .createRecord('pki/action', {
          type: 'existing',
        })
        .save(adapterOptions);
      await this.store
        .createRecord('pki/action', {
          type: 'kms',
        })
        .save(adapterOptions);
    });
  });
});
