import { DisputableVotingConnectorTheGraph, Setting } from '../../../src'

const VOTING_APP_ADDRESS = '0x26e14ed789b51b5b226d69a5d40f72dc2d0180fe'
const VOTING_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/aragon/aragon-dvoting-rinkeby-staging'

describe('DisputableVoting settings', () => {
  let connector: DisputableVotingConnectorTheGraph

  beforeAll(() => {
    connector = new DisputableVotingConnectorTheGraph({
      subgraphUrl: VOTING_SUBGRAPH_URL,
    })
  })

  afterAll(async () => {
    await connector.disconnect()
  })

  describe('current setting', () => {
    let setting: Setting

    beforeAll(async () => {
      setting = await connector.currentSetting(VOTING_APP_ADDRESS)
    })

    test('returns the current setting information', () => {
      expect(setting.id).toBe(`${VOTING_APP_ADDRESS}-setting-0`)
      expect(setting.votingId).toBe(VOTING_APP_ADDRESS)
      expect(setting.settingId).toEqual('0')
      expect(setting.supportRequiredPct).toBe('500000000000000000')
      expect(setting.minimumAcceptanceQuorumPct).toBe('200000000000000000')
      expect(setting.executionDelay).toBe('0')
      expect(setting.overruleWindow).toBe('172800')
      expect(setting.quietEndingPeriod).toBe('86400')
      expect(setting.quietEndingExtension).toBe('43200')
      expect(setting.createdAt).toBe('1596141103')
    })
  })

  describe('setting', () => {
    let setting: Setting

    beforeAll(async () => {
      setting = await connector.setting(`${VOTING_APP_ADDRESS}-setting-0`)
    })

    test('returns the requested setting information', () => {
      expect(setting.id).toBe(`${VOTING_APP_ADDRESS}-setting-0`)
      expect(setting.votingId).toBe(VOTING_APP_ADDRESS)
      expect(setting.settingId).toEqual('0')
      expect(setting.supportRequiredPct).toBe('500000000000000000')
      expect(setting.minimumAcceptanceQuorumPct).toBe('200000000000000000')
      expect(setting.executionDelay).toBe('0')
      expect(setting.overruleWindow).toBe('172800')
      expect(setting.quietEndingPeriod).toBe('86400')
      expect(setting.quietEndingExtension).toBe('43200')
      expect(setting.createdAt).toBe('1596141103')
    })
  })

  describe('settings', () => {
    let settings: Setting[]

    beforeAll(async () => {
      settings = await connector.settings(VOTING_APP_ADDRESS, 1000, 0)
    })

    test('returns a list of settings', () => {
      expect(settings.length).toBeGreaterThan(0)
    })

    test('allows fetching a single setting', () => {
      const setting = settings[0]

      expect(setting.id).toBe(`${VOTING_APP_ADDRESS}-setting-0`)
      expect(setting.votingId).toBe(VOTING_APP_ADDRESS)
      expect(setting.settingId).toEqual('0')
      expect(setting.supportRequiredPct).toBe('500000000000000000')
      expect(setting.minimumAcceptanceQuorumPct).toBe('200000000000000000')
      expect(setting.executionDelay).toBe('0')
      expect(setting.overruleWindow).toBe('172800')
      expect(setting.quietEndingPeriod).toBe('86400')
      expect(setting.quietEndingExtension).toBe('43200')
      expect(setting.createdAt).toBe('1596141103')
    })
  })
})
