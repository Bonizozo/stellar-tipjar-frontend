# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> dark theme >> creator profile has no serious/critical violations
- Location: tests/e2e/a11y.spec.ts:28:11

# Error details

```
Error: 2 axe violation(s) on dark theme > creator profile:

[SERIOUS] aria-progressbar-name: Ensure every ARIA progressbar node has an accessible name
  Help: https://dequeuniversity.com/rules/axe/4.10/aria-progressbar-name?application=playwright
  Nodes (1):
    - <div class="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan transition-all duration-700" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1" style="width: 0%;"></div>

[SERIOUS] aria-prohibited-attr: Ensure ARIA attributes are not prohibited for an element's role
  Help: https://dequeuniversity.com/rules/axe/4.10/aria-prohibited-attr?application=playwright
  Nodes (5):
    - <div title="None" aria-label="Level 0: None" style="width: 13px; height: 13px; background-color: rgba(15, 108, 123, 0.08); border-radius: 2.34px;"></div>
    - <div title="Low" aria-label="Level 1: Low" style="width: 13px; height: 13px; background-color: rgba(15, 108, 123, 0.25); border-radius: 2.34px;"></div>
    - <div title="Medium" aria-label="Level 2: Medium" style="width: 13px; height: 13px; background-color: rgba(15, 108, 123, 0.5); border-radius: 2.34px;"></div>
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]: Freighter not installed
      - 'status "WebSocket status: Offline" [ref=e5]': Offline
    - generic [ref=e6]:
      - link "Back to Explore" [ref=e9]:
        - /url: /explore
        - button "Back to Explore" [ref=e10]:
          - img [ref=e11]
          - text: Back to Explore
      - generic [ref=e13]:
        - generic [ref=e14]:
          - generic [ref=e15]:
            - img "Test User's avatar" [ref=e17]
            - generic [ref=e18]:
              - heading "Test User" [level=1] [ref=e20]
              - paragraph [ref=e21]: "@testuser"
          - generic [ref=e22]:
            - link "QR Code" [ref=e23]:
              - /url: /creator/testuser/qr
              - button "QR Code" [ref=e24]
            - link "View in AR" [ref=e25]:
              - /url: /ar?mode=profile&username=testuser
              - img [ref=e26]
              - text: View in AR
            - button "Report @testuser" [ref=e32]: ⚑ Report
        - generic [ref=e33]:
          - paragraph [ref=e34]: A test creator
          - generic [ref=e35]:
            - paragraph [ref=e36]: Categories & Tags
            - generic [ref=e37]:
              - 'generic "Tag: art" [ref=e39]':
                - text: "#art"
                - img [ref=e40]
              - 'generic "Tag: test-tag" [ref=e43]':
                - text: "#test-tag"
                - img [ref=e44]
    - generic [ref=e46]:
      - generic [ref=e47]:
        - generic [ref=e48]:
          - heading "Matching Campaigns" [level=2] [ref=e49]
          - paragraph [ref=e50]: Active matching campaigns that boost tips for this creator.
          - paragraph [ref=e51]: No active matching campaigns right now.
        - generic [ref=e52]:
          - heading "Creator Statistics" [level=2] [ref=e53]
          - generic [ref=e54]:
            - generic [ref=e55]:
              - heading "Fundraising Goal" [level=2] [ref=e56]:
                - img [ref=e57]
                - text: Fundraising Goal
              - generic [ref=e59]:
                - heading "Funding Goal Progress" [level=3] [ref=e61]
                - generic [ref=e62]:
                  - generic [ref=e63]: 1,234.5 / 10,000 XLM
                  - generic [ref=e64]: 12.3%
                - paragraph [ref=e65]: 13% to Bronze
            - generic [ref=e66]:
              - generic [ref=e67]:
                - generic [ref=e68]:
                  - img [ref=e70]
                  - generic [ref=e72]:
                    - img [ref=e73]
                    - generic [ref=e75]: +12.5%
                - heading "1,234.5 XLM" [level=3] [ref=e76]:
                  - generic [ref=e77]: 1,234.5 XLM
                - paragraph [ref=e78]: Total Tips
                - application [ref=e83]
              - generic [ref=e89]:
                - generic [ref=e90]:
                  - img [ref=e92]
                  - generic [ref=e94]:
                    - img [ref=e95]
                    - generic [ref=e97]: +8.2%
                - heading "56" [level=3] [ref=e98]
                - paragraph [ref=e99]: Tip Count
                - application [ref=e104]
              - generic [ref=e110]:
                - generic [ref=e111]:
                  - img [ref=e113]
                  - generic [ref=e115]:
                    - img [ref=e116]
                    - generic [ref=e118]: "-2.4%"
                - heading "42" [level=3] [ref=e119]
                - paragraph [ref=e120]: Supporters
                - application [ref=e125]
            - generic [ref=e131]:
              - generic [ref=e132]:
                - heading "Tip History" [level=2] [ref=e133]
                - generic [ref=e134]:
                  - paragraph [ref=e135]: Tips over time (XLM)
                  - application [ref=e138]:
                    - generic [ref=e150]:
                      - generic [ref=e151]:
                        - generic [ref=e153]: Aug 5
                        - generic [ref=e155]: Aug 6
                        - generic [ref=e157]: Aug 7
                        - generic [ref=e159]: Aug 8
                        - generic [ref=e161]: Aug 9
                        - generic [ref=e163]: Aug 10
                        - generic [ref=e165]: Aug 11
                        - generic [ref=e167]: Aug 12
                        - generic [ref=e169]: Aug 13
                        - generic [ref=e171]: Aug 14
                        - generic [ref=e173]: Aug 15
                        - generic [ref=e175]: Aug 16
                        - generic [ref=e177]: Aug 17
                        - generic [ref=e179]: Aug 18
                      - generic [ref=e180]:
                        - generic [ref=e182]: "0"
                        - generic [ref=e184]: "40"
                        - generic [ref=e186]: "80"
                        - generic [ref=e188]: "120"
                        - generic [ref=e190]: "160"
              - generic [ref=e191]:
                - heading "Top Supporters" [level=2] [ref=e192]
                - generic [ref=e193]:
                  - paragraph [ref=e194]: Top Supporters
                  - list [ref=e195]:
                    - listitem [ref=e196]:
                      - text: "1"
                      - generic [ref=e197]:
                        - generic [ref=e198]:
                          - text: "@stellar-fan"
                          - generic [ref=e199]: 300 XLM
                        - paragraph [ref=e200]: 8 tips
                    - listitem [ref=e201]:
                      - text: "2"
                      - generic [ref=e202]:
                        - generic [ref=e203]:
                          - text: "@xlm-lover"
                          - generic [ref=e204]: 250 XLM
                        - paragraph [ref=e205]: 5 tips
                    - listitem [ref=e206]:
                      - text: "3"
                      - generic [ref=e207]:
                        - generic [ref=e208]:
                          - text: "@crypto-alice"
                          - generic [ref=e209]: 180 XLM
                        - paragraph [ref=e210]: 12 tips
                    - listitem [ref=e211]:
                      - text: "4"
                      - generic [ref=e212]:
                        - generic [ref=e213]:
                          - text: "@blockchainer"
                          - generic [ref=e214]: 120 XLM
                        - paragraph [ref=e215]: 3 tips
                    - listitem [ref=e216]:
                      - text: "5"
                      - generic [ref=e217]:
                        - generic [ref=e218]:
                          - text: "@defi-bob"
                          - generic [ref=e219]: 90 XLM
                        - paragraph [ref=e220]: 6 tips
            - generic [ref=e221]:
              - heading "Activity Heatmap" [level=2] [ref=e222]
              - generic [ref=e223]:
                - generic [ref=e224]:
                  - generic [ref=e225]:
                    - generic [ref=e226]:
                      - heading "testuser's Tip Activity" [level=3] [ref=e227]
                      - paragraph [ref=e228]: 554 tips · 218 active days
                    - generic [ref=e229]:
                      - generic [ref=e230]:
                        - button "1yr" [ref=e231]
                        - button "2yr" [ref=e232]
                        - button "3yr" [ref=e233]
                      - generic [ref=e234]:
                        - button "Previous year" [ref=e235]
                        - text: This year
                        - button "Next year" [disabled] [ref=e237]
                      - generic [ref=e239]:
                        - button "Ocean theme" [pressed] [ref=e240]
                        - button "Sunrise theme" [ref=e241]
                        - button "Moss theme" [ref=e242]
                        - button "Purple theme" [ref=e243]
                        - button "Mono theme" [ref=e244]
                  - generic [ref=e245]:
                    - grid "Tip activity heatmap" [ref=e246]:
                      - generic [ref=e247]:
                        - generic [ref=e248]:
                          - generic [ref=e249]: Aug
                          - generic [ref=e250]: Sep
                          - generic [ref=e251]: Oct
                          - generic [ref=e252]: Nov
                          - generic [ref=e253]: Dec
                          - generic [ref=e254]: Jan
                          - generic [ref=e255]: Feb
                          - generic [ref=e256]: Mar
                          - generic [ref=e257]: Apr
                          - generic [ref=e258]: May
                          - generic [ref=e259]: Jun
                          - generic [ref=e260]: Jul
                          - generic [ref=e261]: Aug
                        - generic [ref=e262]:
                          - generic [ref=e263]:
                            - generic [ref=e265]: Mon
                            - generic [ref=e267]: Wed
                            - generic [ref=e269]: Fri
                          - generic [ref=e271]:
                            - row "Week of 2025-08-17" [ref=e272]:
                              - 'gridcell "2025-08-17: no tips" [ref=e273] [cursor=pointer]'
                              - 'gridcell "2025-08-18: no tips" [ref=e274] [cursor=pointer]'
                              - 'gridcell "2025-08-19: 236.68 XLM, 4 tips" [ref=e275] [cursor=pointer]'
                              - 'gridcell "2025-08-20: 61.07 XLM, 1 tip" [ref=e276] [cursor=pointer]'
                              - 'gridcell "2025-08-21: no tips" [ref=e277] [cursor=pointer]'
                              - 'gridcell "2025-08-22: no tips" [ref=e278] [cursor=pointer]'
                              - 'gridcell "2025-08-23: no tips" [ref=e279] [cursor=pointer]'
                            - row "Week of 2025-08-24" [ref=e280]:
                              - 'gridcell "2025-08-24: 177.33 XLM, 4 tips" [ref=e281] [cursor=pointer]'
                              - 'gridcell "2025-08-25: 119.60 XLM, 2 tips" [ref=e282] [cursor=pointer]'
                              - 'gridcell "2025-08-26: no tips" [ref=e283] [cursor=pointer]'
                              - 'gridcell "2025-08-27: no tips" [ref=e284] [cursor=pointer]'
                              - 'gridcell "2025-08-28: 302.21 XLM, 4 tips" [ref=e285] [cursor=pointer]'
                              - 'gridcell "2025-08-29: no tips" [ref=e286] [cursor=pointer]'
                              - 'gridcell "2025-08-30: no tips" [ref=e287] [cursor=pointer]'
                            - row "Week of 2025-08-31" [ref=e288]:
                              - 'gridcell "2025-08-31: no tips" [ref=e289] [cursor=pointer]'
                              - 'gridcell "2025-09-01: no tips" [ref=e290] [cursor=pointer]'
                              - 'gridcell "2025-09-02: 6.59 XLM, 1 tip" [ref=e291] [cursor=pointer]'
                              - 'gridcell "2025-09-03: no tips" [ref=e292] [cursor=pointer]'
                              - 'gridcell "2025-09-04: no tips" [ref=e293] [cursor=pointer]'
                              - 'gridcell "2025-09-05: 234.20 XLM, 3 tips" [ref=e294] [cursor=pointer]'
                              - 'gridcell "2025-09-06: 16.43 XLM, 1 tip" [ref=e295] [cursor=pointer]'
                            - row "Week of 2025-09-07" [ref=e296]:
                              - 'gridcell "2025-09-07: 178.04 XLM, 2 tips" [ref=e297] [cursor=pointer]'
                              - 'gridcell "2025-09-08: no tips" [ref=e298] [cursor=pointer]'
                              - 'gridcell "2025-09-09: no tips" [ref=e299] [cursor=pointer]'
                              - 'gridcell "2025-09-10: 104.99 XLM, 1 tip" [ref=e300] [cursor=pointer]'
                              - 'gridcell "2025-09-11: 196.44 XLM, 2 tips" [ref=e301] [cursor=pointer]'
                              - 'gridcell "2025-09-12: no tips" [ref=e302] [cursor=pointer]'
                              - 'gridcell "2025-09-13: 301.05 XLM, 4 tips" [ref=e303] [cursor=pointer]'
                            - row "Week of 2025-09-14" [ref=e304]:
                              - 'gridcell "2025-09-14: 69.52 XLM, 1 tip" [ref=e305] [cursor=pointer]'
                              - 'gridcell "2025-09-15: 216.84 XLM, 3 tips" [ref=e306] [cursor=pointer]'
                              - 'gridcell "2025-09-16: no tips" [ref=e307] [cursor=pointer]'
                              - 'gridcell "2025-09-17: no tips" [ref=e308] [cursor=pointer]'
                              - 'gridcell "2025-09-18: 345.36 XLM, 4 tips" [ref=e309] [cursor=pointer]'
                              - 'gridcell "2025-09-19: 219.04 XLM, 4 tips" [ref=e310] [cursor=pointer]'
                              - 'gridcell "2025-09-20: 180.99 XLM, 3 tips" [ref=e311] [cursor=pointer]'
                            - row "Week of 2025-09-21" [ref=e312]:
                              - 'gridcell "2025-09-21: 46.42 XLM, 1 tip" [ref=e313] [cursor=pointer]'
                              - 'gridcell "2025-09-22: 185.09 XLM, 2 tips" [ref=e314] [cursor=pointer]'
                              - 'gridcell "2025-09-23: no tips" [ref=e315] [cursor=pointer]'
                              - 'gridcell "2025-09-24: no tips" [ref=e316] [cursor=pointer]'
                              - 'gridcell "2025-09-25: 199.02 XLM, 2 tips" [ref=e317] [cursor=pointer]'
                              - 'gridcell "2025-09-26: no tips" [ref=e318] [cursor=pointer]'
                              - 'gridcell "2025-09-27: 84.60 XLM, 1 tip" [ref=e319] [cursor=pointer]'
                            - row "Week of 2025-09-28" [ref=e320]:
                              - 'gridcell "2025-09-28: no tips" [ref=e321] [cursor=pointer]'
                              - 'gridcell "2025-09-29: no tips" [ref=e322] [cursor=pointer]'
                              - 'gridcell "2025-09-30: 189.08 XLM, 3 tips" [ref=e323] [cursor=pointer]'
                              - 'gridcell "2025-10-01: 95.25 XLM, 3 tips" [ref=e324] [cursor=pointer]'
                              - 'gridcell "2025-10-02: no tips" [ref=e325] [cursor=pointer]'
                              - 'gridcell "2025-10-03: no tips" [ref=e326] [cursor=pointer]'
                              - 'gridcell "2025-10-04: 171.90 XLM, 4 tips" [ref=e327] [cursor=pointer]'
                            - row "Week of 2025-10-05" [ref=e328]:
                              - 'gridcell "2025-10-05: no tips" [ref=e329] [cursor=pointer]'
                              - 'gridcell "2025-10-06: no tips" [ref=e330] [cursor=pointer]'
                              - 'gridcell "2025-10-07: 103.71 XLM, 1 tip" [ref=e331] [cursor=pointer]'
                              - 'gridcell "2025-10-08: 208.96 XLM, 4 tips" [ref=e332] [cursor=pointer]'
                              - 'gridcell "2025-10-09: no tips" [ref=e333] [cursor=pointer]'
                              - 'gridcell "2025-10-10: no tips" [ref=e334] [cursor=pointer]'
                              - 'gridcell "2025-10-11: 95.14 XLM, 1 tip" [ref=e335] [cursor=pointer]'
                            - row "Week of 2025-10-12" [ref=e336]:
                              - 'gridcell "2025-10-12: no tips" [ref=e337] [cursor=pointer]'
                              - 'gridcell "2025-10-13: 323.71 XLM, 4 tips" [ref=e338] [cursor=pointer]'
                              - 'gridcell "2025-10-14: 151.24 XLM, 4 tips" [ref=e339] [cursor=pointer]'
                              - 'gridcell "2025-10-15: no tips" [ref=e340] [cursor=pointer]'
                              - 'gridcell "2025-10-16: 211.88 XLM, 2 tips" [ref=e341] [cursor=pointer]'
                              - 'gridcell "2025-10-17: no tips" [ref=e342] [cursor=pointer]'
                              - 'gridcell "2025-10-18: no tips" [ref=e343] [cursor=pointer]'
                            - row "Week of 2025-10-19" [ref=e344]:
                              - 'gridcell "2025-10-19: 235.49 XLM, 4 tips" [ref=e345] [cursor=pointer]'
                              - 'gridcell "2025-10-20: no tips" [ref=e346] [cursor=pointer]'
                              - 'gridcell "2025-10-21: no tips" [ref=e347] [cursor=pointer]'
                              - 'gridcell "2025-10-22: no tips" [ref=e348] [cursor=pointer]'
                              - 'gridcell "2025-10-23: 192.85 XLM, 2 tips" [ref=e349] [cursor=pointer]'
                              - 'gridcell "2025-10-24: 147.54 XLM, 2 tips" [ref=e350] [cursor=pointer]'
                              - 'gridcell "2025-10-25: 221.63 XLM, 4 tips" [ref=e351] [cursor=pointer]'
                            - row "Week of 2025-10-26" [ref=e352]:
                              - 'gridcell "2025-10-26: 38.16 XLM, 1 tip" [ref=e353] [cursor=pointer]'
                              - 'gridcell "2025-10-27: 59.85 XLM, 1 tip" [ref=e354] [cursor=pointer]'
                              - 'gridcell "2025-10-28: 264.55 XLM, 3 tips" [ref=e355] [cursor=pointer]'
                              - 'gridcell "2025-10-29: no tips" [ref=e356] [cursor=pointer]'
                              - 'gridcell "2025-10-30: 211.59 XLM, 3 tips" [ref=e357] [cursor=pointer]'
                              - 'gridcell "2025-10-31: 261.18 XLM, 3 tips" [ref=e358] [cursor=pointer]'
                              - 'gridcell "2025-11-01: 137.53 XLM, 4 tips" [ref=e359] [cursor=pointer]'
                            - row "Week of 2025-11-02" [ref=e360]:
                              - 'gridcell "2025-11-02: 70.37 XLM, 1 tip" [ref=e361] [cursor=pointer]'
                              - 'gridcell "2025-11-03: 85.66 XLM, 1 tip" [ref=e362] [cursor=pointer]'
                              - 'gridcell "2025-11-04: 101.18 XLM, 2 tips" [ref=e363] [cursor=pointer]'
                              - 'gridcell "2025-11-05: 95.82 XLM, 1 tip" [ref=e364] [cursor=pointer]'
                              - 'gridcell "2025-11-06: 148.26 XLM, 4 tips" [ref=e365] [cursor=pointer]'
                              - 'gridcell "2025-11-07: no tips" [ref=e366] [cursor=pointer]'
                              - 'gridcell "2025-11-08: 251.69 XLM, 4 tips" [ref=e367] [cursor=pointer]'
                            - row "Week of 2025-11-09" [ref=e368]:
                              - 'gridcell "2025-11-09: no tips" [ref=e369] [cursor=pointer]'
                              - 'gridcell "2025-11-10: no tips" [ref=e370] [cursor=pointer]'
                              - 'gridcell "2025-11-11: 191.21 XLM, 3 tips" [ref=e371] [cursor=pointer]'
                              - 'gridcell "2025-11-12: 325.68 XLM, 4 tips" [ref=e372] [cursor=pointer]'
                              - 'gridcell "2025-11-13: 77.32 XLM, 1 tip" [ref=e373] [cursor=pointer]'
                              - 'gridcell "2025-11-14: 212.34 XLM, 2 tips" [ref=e374] [cursor=pointer]'
                              - 'gridcell "2025-11-15: 263.46 XLM, 3 tips" [ref=e375] [cursor=pointer]'
                            - row "Week of 2025-11-16" [ref=e376]:
                              - 'gridcell "2025-11-16: no tips" [ref=e377] [cursor=pointer]'
                              - 'gridcell "2025-11-17: 59.28 XLM, 1 tip" [ref=e378] [cursor=pointer]'
                              - 'gridcell "2025-11-18: 111.38 XLM, 1 tip" [ref=e379] [cursor=pointer]'
                              - 'gridcell "2025-11-19: no tips" [ref=e380] [cursor=pointer]'
                              - 'gridcell "2025-11-20: 18.93 XLM, 1 tip" [ref=e381] [cursor=pointer]'
                              - 'gridcell "2025-11-21: no tips" [ref=e382] [cursor=pointer]'
                              - 'gridcell "2025-11-22: 148.89 XLM, 3 tips" [ref=e383] [cursor=pointer]'
                            - row "Week of 2025-11-23" [ref=e384]:
                              - 'gridcell "2025-11-23: 183.24 XLM, 4 tips" [ref=e385] [cursor=pointer]'
                              - 'gridcell "2025-11-24: 120.71 XLM, 1 tip" [ref=e386] [cursor=pointer]'
                              - 'gridcell "2025-11-25: 93.82 XLM, 2 tips" [ref=e387] [cursor=pointer]'
                              - 'gridcell "2025-11-26: 179.99 XLM, 3 tips" [ref=e388] [cursor=pointer]'
                              - 'gridcell "2025-11-27: no tips" [ref=e389] [cursor=pointer]'
                              - 'gridcell "2025-11-28: no tips" [ref=e390] [cursor=pointer]'
                              - 'gridcell "2025-11-29: no tips" [ref=e391] [cursor=pointer]'
                            - row "Week of 2025-11-30" [ref=e392]:
                              - 'gridcell "2025-11-30: 318.19 XLM, 4 tips" [ref=e393] [cursor=pointer]'
                              - 'gridcell "2025-12-01: 67.38 XLM, 2 tips" [ref=e394] [cursor=pointer]'
                              - 'gridcell "2025-12-02: 186.50 XLM, 2 tips" [ref=e395] [cursor=pointer]'
                              - 'gridcell "2025-12-03: no tips" [ref=e396] [cursor=pointer]'
                              - 'gridcell "2025-12-04: no tips" [ref=e397] [cursor=pointer]'
                              - 'gridcell "2025-12-05: 114.61 XLM, 2 tips" [ref=e398] [cursor=pointer]'
                              - 'gridcell "2025-12-06: no tips" [ref=e399] [cursor=pointer]'
                            - row "Week of 2025-12-07" [ref=e400]:
                              - 'gridcell "2025-12-07: no tips" [ref=e401] [cursor=pointer]'
                              - 'gridcell "2025-12-08: 184.80 XLM, 2 tips" [ref=e402] [cursor=pointer]'
                              - 'gridcell "2025-12-09: 7.87 XLM, 1 tip" [ref=e403] [cursor=pointer]'
                              - 'gridcell "2025-12-10: 298.18 XLM, 4 tips" [ref=e404] [cursor=pointer]'
                              - 'gridcell "2025-12-11: 14.29 XLM, 1 tip" [ref=e405] [cursor=pointer]'
                              - 'gridcell "2025-12-12: 208.82 XLM, 4 tips" [ref=e406] [cursor=pointer]'
                              - 'gridcell "2025-12-13: 116.08 XLM, 2 tips" [ref=e407] [cursor=pointer]'
                            - row "Week of 2025-12-14" [ref=e408]:
                              - 'gridcell "2025-12-14: 166.69 XLM, 2 tips" [ref=e409] [cursor=pointer]'
                              - 'gridcell "2025-12-15: 208.32 XLM, 3 tips" [ref=e410] [cursor=pointer]'
                              - 'gridcell "2025-12-16: no tips" [ref=e411] [cursor=pointer]'
                              - 'gridcell "2025-12-17: 244.71 XLM, 4 tips" [ref=e412] [cursor=pointer]'
                              - 'gridcell "2025-12-18: no tips" [ref=e413] [cursor=pointer]'
                              - 'gridcell "2025-12-19: no tips" [ref=e414] [cursor=pointer]'
                              - 'gridcell "2025-12-20: 68.64 XLM, 1 tip" [ref=e415] [cursor=pointer]'
                            - row "Week of 2025-12-21" [ref=e416]:
                              - 'gridcell "2025-12-21: 34.02 XLM, 1 tip" [ref=e417] [cursor=pointer]'
                              - 'gridcell "2025-12-22: no tips" [ref=e418] [cursor=pointer]'
                              - 'gridcell "2025-12-23: no tips" [ref=e419] [cursor=pointer]'
                              - 'gridcell "2025-12-24: no tips" [ref=e420] [cursor=pointer]'
                              - 'gridcell "2025-12-25: no tips" [ref=e421] [cursor=pointer]'
                              - 'gridcell "2025-12-26: no tips" [ref=e422] [cursor=pointer]'
                              - 'gridcell "2025-12-27: 56.01 XLM, 2 tips" [ref=e423] [cursor=pointer]'
                            - row "Week of 2025-12-28" [ref=e424]:
                              - 'gridcell "2025-12-28: 114.25 XLM, 1 tip" [ref=e425] [cursor=pointer]'
                              - 'gridcell "2025-12-29: no tips" [ref=e426] [cursor=pointer]'
                              - 'gridcell "2025-12-30: 219.30 XLM, 4 tips" [ref=e427] [cursor=pointer]'
                              - 'gridcell "2025-12-31: 336.43 XLM, 4 tips" [ref=e428] [cursor=pointer]'
                              - 'gridcell "2026-01-01: no tips" [ref=e429] [cursor=pointer]'
                              - 'gridcell "2026-01-02: 132.19 XLM, 2 tips" [ref=e430] [cursor=pointer]'
                              - 'gridcell "2026-01-03: 193.13 XLM, 3 tips" [ref=e431] [cursor=pointer]'
                            - row "Week of 2026-01-04" [ref=e432]:
                              - 'gridcell "2026-01-04: 42.96 XLM, 2 tips" [ref=e433] [cursor=pointer]'
                              - 'gridcell "2026-01-05: no tips" [ref=e434] [cursor=pointer]'
                              - 'gridcell "2026-01-06: no tips" [ref=e435] [cursor=pointer]'
                              - 'gridcell "2026-01-07: no tips" [ref=e436] [cursor=pointer]'
                              - 'gridcell "2026-01-08: 125.55 XLM, 4 tips" [ref=e437] [cursor=pointer]'
                              - 'gridcell "2026-01-09: 69.73 XLM, 1 tip" [ref=e438] [cursor=pointer]'
                              - 'gridcell "2026-01-10: 68.09 XLM, 1 tip" [ref=e439] [cursor=pointer]'
                            - row "Week of 2026-01-11" [ref=e440]:
                              - 'gridcell "2026-01-11: 95.39 XLM, 1 tip" [ref=e441] [cursor=pointer]'
                              - 'gridcell "2026-01-12: no tips" [ref=e442] [cursor=pointer]'
                              - 'gridcell "2026-01-13: no tips" [ref=e443] [cursor=pointer]'
                              - 'gridcell "2026-01-14: 115.19 XLM, 2 tips" [ref=e444] [cursor=pointer]'
                              - 'gridcell "2026-01-15: no tips" [ref=e445] [cursor=pointer]'
                              - 'gridcell "2026-01-16: 221.92 XLM, 4 tips" [ref=e446] [cursor=pointer]'
                              - 'gridcell "2026-01-17: 79.69 XLM, 1 tip" [ref=e447] [cursor=pointer]'
                            - row "Week of 2026-01-18" [ref=e448]:
                              - 'gridcell "2026-01-18: no tips" [ref=e449] [cursor=pointer]'
                              - 'gridcell "2026-01-19: 11.64 XLM, 1 tip" [ref=e450] [cursor=pointer]'
                              - 'gridcell "2026-01-20: 240.36 XLM, 4 tips" [ref=e451] [cursor=pointer]'
                              - 'gridcell "2026-01-21: no tips" [ref=e452] [cursor=pointer]'
                              - 'gridcell "2026-01-22: 160.32 XLM, 2 tips" [ref=e453] [cursor=pointer]'
                              - 'gridcell "2026-01-23: 298.37 XLM, 4 tips" [ref=e454] [cursor=pointer]'
                              - 'gridcell "2026-01-24: 113.11 XLM, 3 tips" [ref=e455] [cursor=pointer]'
                            - row "Week of 2026-01-25" [ref=e456]:
                              - 'gridcell "2026-01-25: 384.03 XLM, 4 tips" [ref=e457] [cursor=pointer]'
                              - 'gridcell "2026-01-26: no tips" [ref=e458] [cursor=pointer]'
                              - 'gridcell "2026-01-27: 115.86 XLM, 4 tips" [ref=e459] [cursor=pointer]'
                              - 'gridcell "2026-01-28: 278.05 XLM, 3 tips" [ref=e460] [cursor=pointer]'
                              - 'gridcell "2026-01-29: no tips" [ref=e461] [cursor=pointer]'
                              - 'gridcell "2026-01-30: no tips" [ref=e462] [cursor=pointer]'
                              - 'gridcell "2026-01-31: 91.47 XLM, 3 tips" [ref=e463] [cursor=pointer]'
                            - row "Week of 2026-02-01" [ref=e464]:
                              - 'gridcell "2026-02-01: no tips" [ref=e465] [cursor=pointer]'
                              - 'gridcell "2026-02-02: no tips" [ref=e466] [cursor=pointer]'
                              - 'gridcell "2026-02-03: 47.70 XLM, 1 tip" [ref=e467] [cursor=pointer]'
                              - 'gridcell "2026-02-04: 317.93 XLM, 3 tips" [ref=e468] [cursor=pointer]'
                              - 'gridcell "2026-02-05: 255.98 XLM, 4 tips" [ref=e469] [cursor=pointer]'
                              - 'gridcell "2026-02-06: 231.02 XLM, 4 tips" [ref=e470] [cursor=pointer]'
                              - 'gridcell "2026-02-07: 213.29 XLM, 3 tips" [ref=e471] [cursor=pointer]'
                            - row "Week of 2026-02-08" [ref=e472]:
                              - 'gridcell "2026-02-08: 266.31 XLM, 4 tips" [ref=e473] [cursor=pointer]'
                              - 'gridcell "2026-02-09: no tips" [ref=e474] [cursor=pointer]'
                              - 'gridcell "2026-02-10: 167.25 XLM, 3 tips" [ref=e475] [cursor=pointer]'
                              - 'gridcell "2026-02-11: no tips" [ref=e476] [cursor=pointer]'
                              - 'gridcell "2026-02-12: no tips" [ref=e477] [cursor=pointer]'
                              - 'gridcell "2026-02-13: no tips" [ref=e478] [cursor=pointer]'
                              - 'gridcell "2026-02-14: 129.92 XLM, 4 tips" [ref=e479] [cursor=pointer]'
                            - row "Week of 2026-02-15" [ref=e480]:
                              - 'gridcell "2026-02-15: 35.72 XLM, 1 tip" [ref=e481] [cursor=pointer]'
                              - 'gridcell "2026-02-16: no tips" [ref=e482] [cursor=pointer]'
                              - 'gridcell "2026-02-17: no tips" [ref=e483] [cursor=pointer]'
                              - 'gridcell "2026-02-18: no tips" [ref=e484] [cursor=pointer]'
                              - 'gridcell "2026-02-19: no tips" [ref=e485] [cursor=pointer]'
                              - 'gridcell "2026-02-20: 186.08 XLM, 3 tips" [ref=e486] [cursor=pointer]'
                              - 'gridcell "2026-02-21: no tips" [ref=e487] [cursor=pointer]'
                            - row "Week of 2026-02-22" [ref=e488]:
                              - 'gridcell "2026-02-22: 253.74 XLM, 4 tips" [ref=e489] [cursor=pointer]'
                              - 'gridcell "2026-02-23: no tips" [ref=e490] [cursor=pointer]'
                              - 'gridcell "2026-02-24: 84.62 XLM, 1 tip" [ref=e491] [cursor=pointer]'
                              - 'gridcell "2026-02-25: 138.70 XLM, 3 tips" [ref=e492] [cursor=pointer]'
                              - 'gridcell "2026-02-26: 218.93 XLM, 3 tips" [ref=e493] [cursor=pointer]'
                              - 'gridcell "2026-02-27: 323.17 XLM, 3 tips" [ref=e494] [cursor=pointer]'
                              - 'gridcell "2026-02-28: 307.31 XLM, 3 tips" [ref=e495] [cursor=pointer]'
                            - row "Week of 2026-03-01" [ref=e496]:
                              - 'gridcell "2026-03-01: 139.09 XLM, 2 tips" [ref=e497] [cursor=pointer]'
                              - 'gridcell "2026-03-02: 126.07 XLM, 2 tips" [ref=e498] [cursor=pointer]'
                              - 'gridcell "2026-03-03: 260.81 XLM, 4 tips" [ref=e499] [cursor=pointer]'
                              - 'gridcell "2026-03-04: 103.69 XLM, 3 tips" [ref=e500] [cursor=pointer]'
                              - 'gridcell "2026-03-05: 223.49 XLM, 3 tips" [ref=e501] [cursor=pointer]'
                              - 'gridcell "2026-03-06: 218.95 XLM, 3 tips" [ref=e502] [cursor=pointer]'
                              - 'gridcell "2026-03-07: no tips" [ref=e503] [cursor=pointer]'
                            - row "Week of 2026-03-08" [ref=e504]:
                              - 'gridcell "2026-03-08: 83.38 XLM, 1 tip" [ref=e505] [cursor=pointer]'
                              - 'gridcell "2026-03-09: 118.00 XLM, 3 tips" [ref=e506] [cursor=pointer]'
                              - 'gridcell "2026-03-10: 204.69 XLM, 3 tips" [ref=e507] [cursor=pointer]'
                              - 'gridcell "2026-03-11: 146.27 XLM, 3 tips" [ref=e508] [cursor=pointer]'
                              - 'gridcell "2026-03-12: 239.91 XLM, 2 tips" [ref=e509] [cursor=pointer]'
                              - 'gridcell "2026-03-13: no tips" [ref=e510] [cursor=pointer]'
                              - 'gridcell "2026-03-14: 151.86 XLM, 2 tips" [ref=e511] [cursor=pointer]'
                            - row "Week of 2026-03-15" [ref=e512]:
                              - 'gridcell "2026-03-15: no tips" [ref=e513] [cursor=pointer]'
                              - 'gridcell "2026-03-16: no tips" [ref=e514] [cursor=pointer]'
                              - 'gridcell "2026-03-17: 65.40 XLM, 1 tip" [ref=e515] [cursor=pointer]'
                              - 'gridcell "2026-03-18: 44.90 XLM, 1 tip" [ref=e516] [cursor=pointer]'
                              - 'gridcell "2026-03-19: no tips" [ref=e517] [cursor=pointer]'
                              - 'gridcell "2026-03-20: 259.31 XLM, 4 tips" [ref=e518] [cursor=pointer]'
                              - 'gridcell "2026-03-21: no tips" [ref=e519] [cursor=pointer]'
                            - row "Week of 2026-03-22" [ref=e520]:
                              - 'gridcell "2026-03-22: 88.53 XLM, 1 tip" [ref=e521] [cursor=pointer]'
                              - 'gridcell "2026-03-23: 263.45 XLM, 4 tips" [ref=e522] [cursor=pointer]'
                              - 'gridcell "2026-03-24: 319.23 XLM, 4 tips" [ref=e523] [cursor=pointer]'
                              - 'gridcell "2026-03-25: 282.42 XLM, 3 tips" [ref=e524] [cursor=pointer]'
                              - 'gridcell "2026-03-26: 293.56 XLM, 4 tips" [ref=e525] [cursor=pointer]'
                              - 'gridcell "2026-03-27: no tips" [ref=e526] [cursor=pointer]'
                              - 'gridcell "2026-03-28: 293.93 XLM, 4 tips" [ref=e527] [cursor=pointer]'
                            - row "Week of 2026-03-29" [ref=e528]:
                              - 'gridcell "2026-03-29: no tips" [ref=e529] [cursor=pointer]'
                              - 'gridcell "2026-03-30: 135.73 XLM, 2 tips" [ref=e530] [cursor=pointer]'
                              - 'gridcell "2026-03-31: no tips" [ref=e531] [cursor=pointer]'
                              - 'gridcell "2026-04-01: no tips" [ref=e532] [cursor=pointer]'
                              - 'gridcell "2026-04-02: 153.24 XLM, 2 tips" [ref=e533] [cursor=pointer]'
                              - 'gridcell "2026-04-03: no tips" [ref=e534] [cursor=pointer]'
                              - 'gridcell "2026-04-04: 111.00 XLM, 4 tips" [ref=e535] [cursor=pointer]'
                            - row "Week of 2026-04-05" [ref=e536]:
                              - 'gridcell "2026-04-05: 283.38 XLM, 3 tips" [ref=e537] [cursor=pointer]'
                              - 'gridcell "2026-04-06: 221.14 XLM, 3 tips" [ref=e538] [cursor=pointer]'
                              - 'gridcell "2026-04-07: no tips" [ref=e539] [cursor=pointer]'
                              - 'gridcell "2026-04-08: no tips" [ref=e540] [cursor=pointer]'
                              - 'gridcell "2026-04-09: 106.59 XLM, 2 tips" [ref=e541] [cursor=pointer]'
                              - 'gridcell "2026-04-10: 10.62 XLM, 1 tip" [ref=e542] [cursor=pointer]'
                              - 'gridcell "2026-04-11: no tips" [ref=e543] [cursor=pointer]'
                            - row "Week of 2026-04-12" [ref=e544]:
                              - 'gridcell "2026-04-12: 92.53 XLM, 1 tip" [ref=e545] [cursor=pointer]'
                              - 'gridcell "2026-04-13: 151.13 XLM, 2 tips" [ref=e546] [cursor=pointer]'
                              - 'gridcell "2026-04-14: no tips" [ref=e547] [cursor=pointer]'
                              - 'gridcell "2026-04-15: 110.04 XLM, 1 tip" [ref=e548] [cursor=pointer]'
                              - 'gridcell "2026-04-16: no tips" [ref=e549] [cursor=pointer]'
                              - 'gridcell "2026-04-17: 99.98 XLM, 1 tip" [ref=e550] [cursor=pointer]'
                              - 'gridcell "2026-04-18: 116.68 XLM, 1 tip" [ref=e551] [cursor=pointer]'
                            - row "Week of 2026-04-19" [ref=e552]:
                              - 'gridcell "2026-04-19: 216.38 XLM, 4 tips" [ref=e553] [cursor=pointer]'
                              - 'gridcell "2026-04-20: no tips" [ref=e554] [cursor=pointer]'
                              - 'gridcell "2026-04-21: no tips" [ref=e555] [cursor=pointer]'
                              - 'gridcell "2026-04-22: no tips" [ref=e556] [cursor=pointer]'
                              - 'gridcell "2026-04-23: 108.08 XLM, 2 tips" [ref=e557] [cursor=pointer]'
                              - 'gridcell "2026-04-24: no tips" [ref=e558] [cursor=pointer]'
                              - 'gridcell "2026-04-25: 238.68 XLM, 4 tips" [ref=e559] [cursor=pointer]'
                            - row "Week of 2026-04-26" [ref=e560]:
                              - 'gridcell "2026-04-26: 226.61 XLM, 3 tips" [ref=e561] [cursor=pointer]'
                              - 'gridcell "2026-04-27: 194.12 XLM, 2 tips" [ref=e562] [cursor=pointer]'
                              - 'gridcell "2026-04-28: 208.03 XLM, 3 tips" [ref=e563] [cursor=pointer]'
                              - 'gridcell "2026-04-29: 246.07 XLM, 4 tips" [ref=e564] [cursor=pointer]'
                              - 'gridcell "2026-04-30: 215.66 XLM, 3 tips" [ref=e565] [cursor=pointer]'
                              - 'gridcell "2026-05-01: 122.70 XLM, 2 tips" [ref=e566] [cursor=pointer]'
                              - 'gridcell "2026-05-02: 197.33 XLM, 3 tips" [ref=e567] [cursor=pointer]'
                            - row "Week of 2026-05-03" [ref=e568]:
                              - 'gridcell "2026-05-03: 123.92 XLM, 1 tip" [ref=e569] [cursor=pointer]'
                              - 'gridcell "2026-05-04: 69.57 XLM, 1 tip" [ref=e570] [cursor=pointer]'
                              - 'gridcell "2026-05-05: no tips" [ref=e571] [cursor=pointer]'
                              - 'gridcell "2026-05-06: 168.42 XLM, 2 tips" [ref=e572] [cursor=pointer]'
                              - 'gridcell "2026-05-07: no tips" [ref=e573] [cursor=pointer]'
                              - 'gridcell "2026-05-08: no tips" [ref=e574] [cursor=pointer]'
                              - 'gridcell "2026-05-09: no tips" [ref=e575] [cursor=pointer]'
                            - row "Week of 2026-05-10" [ref=e576]:
                              - 'gridcell "2026-05-10: 52.96 XLM, 3 tips" [ref=e577] [cursor=pointer]'
                              - 'gridcell "2026-05-11: no tips" [ref=e578] [cursor=pointer]'
                              - 'gridcell "2026-05-12: no tips" [ref=e579] [cursor=pointer]'
                              - 'gridcell "2026-05-13: 190.26 XLM, 4 tips" [ref=e580] [cursor=pointer]'
                              - 'gridcell "2026-05-14: 207.10 XLM, 2 tips" [ref=e581] [cursor=pointer]'
                              - 'gridcell "2026-05-15: no tips" [ref=e582] [cursor=pointer]'
                              - 'gridcell "2026-05-16: 267.68 XLM, 4 tips" [ref=e583] [cursor=pointer]'
                            - row "Week of 2026-05-17" [ref=e584]:
                              - 'gridcell "2026-05-17: no tips" [ref=e585] [cursor=pointer]'
                              - 'gridcell "2026-05-18: 100.66 XLM, 1 tip" [ref=e586] [cursor=pointer]'
                              - 'gridcell "2026-05-19: no tips" [ref=e587] [cursor=pointer]'
                              - 'gridcell "2026-05-20: 58.51 XLM, 3 tips" [ref=e588] [cursor=pointer]'
                              - 'gridcell "2026-05-21: 147.22 XLM, 2 tips" [ref=e589] [cursor=pointer]'
                              - 'gridcell "2026-05-22: 192.40 XLM, 2 tips" [ref=e590] [cursor=pointer]'
                              - 'gridcell "2026-05-23: 109.23 XLM, 2 tips" [ref=e591] [cursor=pointer]'
                            - row "Week of 2026-05-24" [ref=e592]:
                              - 'gridcell "2026-05-24: no tips" [ref=e593] [cursor=pointer]'
                              - 'gridcell "2026-05-25: no tips" [ref=e594] [cursor=pointer]'
                              - 'gridcell "2026-05-26: no tips" [ref=e595] [cursor=pointer]'
                              - 'gridcell "2026-05-27: no tips" [ref=e596] [cursor=pointer]'
                              - 'gridcell "2026-05-28: 215.90 XLM, 4 tips" [ref=e597] [cursor=pointer]'
                              - 'gridcell "2026-05-29: 146.36 XLM, 2 tips" [ref=e598] [cursor=pointer]'
                              - 'gridcell "2026-05-30: 175.76 XLM, 4 tips" [ref=e599] [cursor=pointer]'
                            - row "Week of 2026-05-31" [ref=e600]:
                              - 'gridcell "2026-05-31: 138.81 XLM, 3 tips" [ref=e601] [cursor=pointer]'
                              - 'gridcell "2026-06-01: 281.33 XLM, 4 tips" [ref=e602] [cursor=pointer]'
                              - 'gridcell "2026-06-02: no tips" [ref=e603] [cursor=pointer]'
                              - 'gridcell "2026-06-03: no tips" [ref=e604] [cursor=pointer]'
                              - 'gridcell "2026-06-04: no tips" [ref=e605] [cursor=pointer]'
                              - 'gridcell "2026-06-05: no tips" [ref=e606] [cursor=pointer]'
                              - 'gridcell "2026-06-06: 78.26 XLM, 1 tip" [ref=e607] [cursor=pointer]'
                            - row "Week of 2026-06-07" [ref=e608]:
                              - 'gridcell "2026-06-07: 343.81 XLM, 4 tips" [ref=e609] [cursor=pointer]'
                              - 'gridcell "2026-06-08: 72.96 XLM, 1 tip" [ref=e610] [cursor=pointer]'
                              - 'gridcell "2026-06-09: 154.73 XLM, 2 tips" [ref=e611] [cursor=pointer]'
                              - 'gridcell "2026-06-10: no tips" [ref=e612] [cursor=pointer]'
                              - 'gridcell "2026-06-11: 191.38 XLM, 4 tips" [ref=e613] [cursor=pointer]'
                              - 'gridcell "2026-06-12: no tips" [ref=e614] [cursor=pointer]'
                              - 'gridcell "2026-06-13: no tips" [ref=e615] [cursor=pointer]'
                            - row "Week of 2026-06-14" [ref=e616]:
                              - 'gridcell "2026-06-14: no tips" [ref=e617] [cursor=pointer]'
                              - 'gridcell "2026-06-15: 148.04 XLM, 2 tips" [ref=e618] [cursor=pointer]'
                              - 'gridcell "2026-06-16: no tips" [ref=e619] [cursor=pointer]'
                              - 'gridcell "2026-06-17: 358.87 XLM, 4 tips" [ref=e620] [cursor=pointer]'
                              - 'gridcell "2026-06-18: no tips" [ref=e621] [cursor=pointer]'
                              - 'gridcell "2026-06-19: 78.37 XLM, 1 tip" [ref=e622] [cursor=pointer]'
                              - 'gridcell "2026-06-20: 280.53 XLM, 4 tips" [ref=e623] [cursor=pointer]'
                            - row "Week of 2026-06-21" [ref=e624]:
                              - 'gridcell "2026-06-21: no tips" [ref=e625] [cursor=pointer]'
                              - 'gridcell "2026-06-22: 91.72 XLM, 2 tips" [ref=e626] [cursor=pointer]'
                              - 'gridcell "2026-06-23: no tips" [ref=e627] [cursor=pointer]'
                              - 'gridcell "2026-06-24: 354.74 XLM, 4 tips" [ref=e628] [cursor=pointer]'
                              - 'gridcell "2026-06-25: 91.48 XLM, 2 tips" [ref=e629] [cursor=pointer]'
                              - 'gridcell "2026-06-26: 72.09 XLM, 1 tip" [ref=e630] [cursor=pointer]'
                              - 'gridcell "2026-06-27: no tips" [ref=e631] [cursor=pointer]'
                            - row "Week of 2026-06-28" [ref=e632]:
                              - 'gridcell "2026-06-28: no tips" [ref=e633] [cursor=pointer]'
                              - 'gridcell "2026-06-29: 119.50 XLM, 2 tips" [ref=e634] [cursor=pointer]'
                              - 'gridcell "2026-06-30: 194.67 XLM, 2 tips" [ref=e635] [cursor=pointer]'
                              - 'gridcell "2026-07-01: 178.50 XLM, 3 tips" [ref=e636] [cursor=pointer]'
                              - 'gridcell "2026-07-02: no tips" [ref=e637] [cursor=pointer]'
                              - 'gridcell "2026-07-03: no tips" [ref=e638] [cursor=pointer]'
                              - 'gridcell "2026-07-04: no tips" [ref=e639] [cursor=pointer]'
                            - row "Week of 2026-07-05" [ref=e640]:
                              - 'gridcell "2026-07-05: 190.37 XLM, 2 tips" [ref=e641] [cursor=pointer]'
                              - 'gridcell "2026-07-06: 181.99 XLM, 2 tips" [ref=e642] [cursor=pointer]'
                              - 'gridcell "2026-07-07: 160.89 XLM, 4 tips" [ref=e643] [cursor=pointer]'
                              - 'gridcell "2026-07-08: no tips" [ref=e644] [cursor=pointer]'
                              - 'gridcell "2026-07-09: no tips" [ref=e645] [cursor=pointer]'
                              - 'gridcell "2026-07-10: 193.04 XLM, 2 tips" [ref=e646] [cursor=pointer]'
                              - 'gridcell "2026-07-11: 67.38 XLM, 2 tips" [ref=e647] [cursor=pointer]'
                            - row "Week of 2026-07-12" [ref=e648]:
                              - 'gridcell "2026-07-12: 136.25 XLM, 2 tips" [ref=e649] [cursor=pointer]'
                              - 'gridcell "2026-07-13: 194.24 XLM, 4 tips" [ref=e650] [cursor=pointer]'
                              - 'gridcell "2026-07-14: 294.29 XLM, 4 tips" [ref=e651] [cursor=pointer]'
                              - 'gridcell "2026-07-15: no tips" [ref=e652] [cursor=pointer]'
                              - 'gridcell "2026-07-16: no tips" [ref=e653] [cursor=pointer]'
                              - 'gridcell "2026-07-17: no tips" [ref=e654] [cursor=pointer]'
                              - 'gridcell "2026-07-18: no tips" [ref=e655] [cursor=pointer]'
                            - row "Week of 2026-07-19" [ref=e656]:
                              - 'gridcell "2026-07-19: no tips" [ref=e657] [cursor=pointer]'
                              - 'gridcell "2026-07-20: 60.97 XLM, 1 tip" [ref=e658] [cursor=pointer]'
                              - 'gridcell "2026-07-21: 21.66 XLM, 1 tip" [ref=e659] [cursor=pointer]'
                              - 'gridcell "2026-07-22: no tips" [ref=e660] [cursor=pointer]'
                              - 'gridcell "2026-07-23: no tips" [ref=e661] [cursor=pointer]'
                              - 'gridcell "2026-07-24: no tips" [ref=e662] [cursor=pointer]'
                              - 'gridcell "2026-07-25: 191.60 XLM, 3 tips" [ref=e663] [cursor=pointer]'
                            - row "Week of 2026-07-26" [ref=e664]:
                              - 'gridcell "2026-07-26: 230.05 XLM, 3 tips" [ref=e665] [cursor=pointer]'
                              - 'gridcell "2026-07-27: 360.70 XLM, 3 tips" [ref=e666] [cursor=pointer]'
                              - 'gridcell "2026-07-28: no tips" [ref=e667] [cursor=pointer]'
                              - 'gridcell "2026-07-29: no tips" [ref=e668] [cursor=pointer]'
                              - 'gridcell "2026-07-30: 268.92 XLM, 3 tips" [ref=e669] [cursor=pointer]'
                              - 'gridcell "2026-07-31: 224.51 XLM, 4 tips" [ref=e670] [cursor=pointer]'
                              - 'gridcell "2026-08-01: 255.43 XLM, 3 tips" [ref=e671] [cursor=pointer]'
                            - row "Week of 2026-08-02" [ref=e672]:
                              - 'gridcell "2026-08-02: 405.48 XLM, 4 tips" [ref=e673] [cursor=pointer]'
                              - 'gridcell "2026-08-03: no tips" [ref=e674] [cursor=pointer]'
                              - 'gridcell "2026-08-04: no tips" [ref=e675] [cursor=pointer]'
                              - 'gridcell "2026-08-05: 205.60 XLM, 2 tips" [ref=e676] [cursor=pointer]'
                              - 'gridcell "2026-08-06: 68.80 XLM, 2 tips" [ref=e677] [cursor=pointer]'
                              - 'gridcell "2026-08-07: 76.59 XLM, 3 tips" [ref=e678] [cursor=pointer]'
                              - 'gridcell "2026-08-08: 337.36 XLM, 4 tips" [ref=e679] [cursor=pointer]'
                            - row "Week of 2026-08-09" [ref=e680]:
                              - 'gridcell "2026-08-09: 37.86 XLM, 2 tips" [ref=e681] [cursor=pointer]'
                              - 'gridcell "2026-08-10: 94.80 XLM, 1 tip" [ref=e682] [cursor=pointer]'
                              - 'gridcell "2026-08-11: 97.14 XLM, 4 tips" [ref=e683] [cursor=pointer]'
                              - 'gridcell "2026-08-12: no tips" [ref=e684] [cursor=pointer]'
                              - 'gridcell "2026-08-13: 60.63 XLM, 2 tips" [ref=e685] [cursor=pointer]'
                              - 'gridcell "2026-08-14: 67.73 XLM, 1 tip" [ref=e686] [cursor=pointer]'
                              - 'gridcell "2026-08-15: 333.77 XLM, 4 tips" [ref=e687] [cursor=pointer]'
                            - row "Week of 2026-08-16" [ref=e688]:
                              - 'gridcell "2026-08-16: no tips" [ref=e689] [cursor=pointer]'
                              - 'gridcell "2026-08-17: 19.54 XLM, 1 tip" [ref=e690] [cursor=pointer]'
                              - 'gridcell "2026-08-18: 48.59 XLM, 1 tip" [ref=e691] [cursor=pointer]'
                              - 'gridcell "2026-08-19: future" [ref=e692]'
                              - 'gridcell "2026-08-20: future" [ref=e693]'
                              - 'gridcell "2026-08-21: future" [ref=e694]'
                              - 'gridcell "2026-08-22: future" [ref=e695]'
                    - generic [ref=e696]:
                      - generic "Activity level legend" [ref=e697]:
                        - text: Less
                        - 'generic "Level 0: None" [ref=e698]'
                        - 'generic "Level 1: Low" [ref=e699]'
                        - 'generic "Level 2: Medium" [ref=e700]'
                        - 'generic "Level 3: High" [ref=e701]'
                        - 'generic "Level 4: Peak" [ref=e702]'
                        - text: More
                      - paragraph [ref=e703]: Today is highlighted with a border
                - generic [ref=e704]:
                  - generic [ref=e705]:
                    - img [ref=e707]
                    - generic [ref=e709]:
                      - paragraph [ref=e710]: Total Earned
                      - paragraph [ref=e711]: 36,356.4 XLM
                  - generic [ref=e712]:
                    - img [ref=e714]
                    - generic [ref=e716]:
                      - paragraph [ref=e717]: Total Tips
                      - paragraph [ref=e718]: "554"
                      - paragraph [ref=e719]: 218 active days
                  - generic [ref=e720]:
                    - img [ref=e722]
                    - generic [ref=e724]:
                      - paragraph [ref=e725]: Avg / Active Day
                      - paragraph [ref=e726]: 166.8 XLM
                  - generic [ref=e727]:
                    - img [ref=e729]
                    - generic [ref=e732]:
                      - paragraph [ref=e733]: Current Streak
                      - paragraph [ref=e734]: 2 days
                  - generic [ref=e735]:
                    - img [ref=e737]
                    - generic [ref=e739]:
                      - paragraph [ref=e740]: Longest Streak
                      - paragraph [ref=e741]: 11 days
                  - generic [ref=e742]:
                    - img [ref=e744]
                    - generic [ref=e746]:
                      - paragraph [ref=e747]: Best Day
                      - paragraph [ref=e748]: 405.5 XLM
                      - paragraph [ref=e749]: Aug 2
        - paragraph [ref=e751]: No portfolio items yet.
        - region "Tip milestones" [ref=e752]:
          - heading "Milestones" [level=2] [ref=e753]
          - paragraph [ref=e754]: No milestones yet — the first tip unlocks one! 🌱
          - generic [ref=e755]:
            - generic [ref=e756]:
              - generic [ref=e757]: 0 tips
              - generic [ref=e758]: "Next: 🌱 First Tip! (1)"
            - generic:
              - progressbar
        - generic [ref=e759]:
          - heading "Tip History" [level=2] [ref=e760]
          - generic [ref=e761]:
            - generic [ref=e762]:
              - generic [ref=e763]: 8 tips
              - text: Virtual scroll active
            - generic [ref=e764]:
              - table [ref=e765]:
                - rowgroup [ref=e766]:
                  - row "Date Amount Recipient Status Memo Transaction Actions" [ref=e767]:
                    - columnheader "Date" [ref=e768]:
                      - button "Date" [ref=e769]:
                        - text: Date
                        - img [ref=e770]
                    - columnheader "Amount" [ref=e772]:
                      - button "Amount" [ref=e773]:
                        - text: Amount
                        - img [ref=e774]
                    - columnheader "Recipient" [ref=e776]:
                      - button "Recipient" [ref=e777]:
                        - text: Recipient
                        - img [ref=e778]
                    - columnheader "Status" [ref=e780]:
                      - button "Status" [ref=e781]:
                        - text: Status
                        - img [ref=e782]
                    - columnheader "Memo" [ref=e784]
                    - columnheader "Transaction" [ref=e785]
                    - columnheader "Actions" [ref=e786]
              - region "Tip history rows" [ref=e787]:
                - table [ref=e788]:
                  - rowgroup [ref=e789]:
                    - row "Mar 20, 2024 at 04:00 PM 50 XLM @alice Completed Great content! abc123... Receipt" [ref=e790]:
                      - cell "Mar 20, 2024 at 04:00 PM" [ref=e791]
                      - cell "50 XLM" [ref=e792]
                      - cell "@alice" [ref=e793]:
                        - link "@alice" [ref=e794]:
                          - /url: /creator/alice
                      - cell "Completed" [ref=e795]
                      - cell "Great content!" [ref=e796]
                      - cell "abc123..." [ref=e797]:
                        - link "abc123..." [ref=e798]:
                          - /url: https://stellar.expert/explorer/public/tx/abc123
                      - cell "Receipt" [ref=e799]:
                        - button "Receipt" [ref=e800]:
                          - img [ref=e801]
                          - text: Receipt
                    - row "Mar 19, 2024 at 09:15 PM 25 XLM @stellar-dev Completed - def456... Receipt" [ref=e803]:
                      - cell "Mar 19, 2024 at 09:15 PM" [ref=e804]
                      - cell "25 XLM" [ref=e805]
                      - cell "@stellar-dev" [ref=e806]:
                        - link "@stellar-dev" [ref=e807]:
                          - /url: /creator/stellar-dev
                      - cell "Completed" [ref=e808]
                      - cell "-" [ref=e809]
                      - cell "def456..." [ref=e810]:
                        - link "def456..." [ref=e811]:
                          - /url: https://stellar.expert/explorer/public/tx/def456
                      - cell "Receipt" [ref=e812]:
                        - button "Receipt" [ref=e813]:
                          - img [ref=e814]
                          - text: Receipt
                    - row "Mar 18, 2024 at 02:45 PM 100 XLM @pixelmaker Pending - - Receipt" [ref=e816]:
                      - cell "Mar 18, 2024 at 02:45 PM" [ref=e817]
                      - cell "100 XLM" [ref=e818]
                      - cell "@pixelmaker" [ref=e819]:
                        - link "@pixelmaker" [ref=e820]:
                          - /url: /creator/pixelmaker
                      - cell "Pending" [ref=e821]
                      - cell "-" [ref=e822]
                      - cell "-" [ref=e823]
                      - cell "Receipt" [ref=e824]:
                        - button "Receipt" [ref=e825]:
                          - img [ref=e826]
                          - text: Receipt
                    - row "Mar 17, 2024 at 07:50 PM 15 XLM @crypto-artist Completed - ghi789... Receipt" [ref=e828]:
                      - cell "Mar 17, 2024 at 07:50 PM" [ref=e829]
                      - cell "15 XLM" [ref=e830]
                      - cell "@crypto-artist" [ref=e831]:
                        - link "@crypto-artist" [ref=e832]:
                          - /url: /creator/crypto-artist
                      - cell "Completed" [ref=e833]
                      - cell "-" [ref=e834]
                      - cell "ghi789..." [ref=e835]:
                        - link "ghi789..." [ref=e836]:
                          - /url: https://stellar.expert/explorer/public/tx/ghi789
                      - cell "Receipt" [ref=e837]:
                        - button "Receipt" [ref=e838]:
                          - img [ref=e839]
                          - text: Receipt
                    - row "Mar 16, 2024 at 04:30 PM 75 XLM @blockchain-edu Failed - - Receipt" [ref=e841]:
                      - cell "Mar 16, 2024 at 04:30 PM" [ref=e842]
                      - cell "75 XLM" [ref=e843]
                      - cell "@blockchain-edu" [ref=e844]:
                        - link "@blockchain-edu" [ref=e845]:
                          - /url: /creator/blockchain-edu
                      - cell "Failed" [ref=e846]
                      - cell "-" [ref=e847]
                      - cell "-" [ref=e848]
                      - cell "Receipt" [ref=e849]:
                        - button "Receipt" [ref=e850]:
                          - img [ref=e851]
                          - text: Receipt
                    - row "Mar 15, 2024 at 10:00 PM 30 XLM @community-lab Completed - jkl012... Receipt" [ref=e853]:
                      - cell "Mar 15, 2024 at 10:00 PM" [ref=e854]
                      - cell "30 XLM" [ref=e855]
                      - cell "@community-lab" [ref=e856]:
                        - link "@community-lab" [ref=e857]:
                          - /url: /creator/community-lab
                      - cell "Completed" [ref=e858]
                      - cell "-" [ref=e859]
                      - cell "jkl012..." [ref=e860]:
                        - link "jkl012..." [ref=e861]:
                          - /url: https://stellar.expert/explorer/public/tx/jkl012
                      - cell "Receipt" [ref=e862]:
                        - button "Receipt" [ref=e863]:
                          - img [ref=e864]
                          - text: Receipt
                    - row "Mar 14, 2024 at 07:15 PM 200 XLM @nft-creator Completed Amazing work! mno345... Receipt" [ref=e866]:
                      - cell "Mar 14, 2024 at 07:15 PM" [ref=e867]
                      - cell "200 XLM" [ref=e868]
                      - cell "@nft-creator" [ref=e869]:
                        - link "@nft-creator" [ref=e870]:
                          - /url: /creator/nft-creator
                      - cell "Completed" [ref=e871]
                      - cell "Amazing work!" [ref=e872]
                      - cell "mno345..." [ref=e873]:
                        - link "mno345..." [ref=e874]:
                          - /url: https://stellar.expert/explorer/public/tx/mno345
                      - cell "Receipt" [ref=e875]:
                        - button "Receipt" [ref=e876]:
                          - img [ref=e877]
                          - text: Receipt
                    - row "Mar 13, 2024 at 03:40 PM 45 XLM @defi-expert Completed - pqr678... Receipt" [ref=e879]:
                      - cell "Mar 13, 2024 at 03:40 PM" [ref=e880]
                      - cell "45 XLM" [ref=e881]
                      - cell "@defi-expert" [ref=e882]:
                        - link "@defi-expert" [ref=e883]:
                          - /url: /creator/defi-expert
                      - cell "Completed" [ref=e884]
                      - cell "-" [ref=e885]
                      - cell "pqr678..." [ref=e886]:
                        - link "pqr678..." [ref=e887]:
                          - /url: https://stellar.expert/explorer/public/tx/pqr678
                      - cell "Receipt" [ref=e888]:
                        - button "Receipt" [ref=e889]:
                          - img [ref=e890]
                          - text: Receipt
        - generic [ref=e892]:
          - heading "Comments (0)" [level=2] [ref=e893]
          - generic [ref=e894]:
            - textbox "Add a comment..." [ref=e895]
            - button "Post Comment" [disabled] [ref=e896]
        - region "Events" [ref=e897]:
          - generic [ref=e899]:
            - heading "Events" [level=2] [ref=e900]
            - paragraph [ref=e901]: 2 upcoming · 0 past
          - generic [ref=e902]:
            - button "upcoming" [pressed] [ref=e903]
            - button "past" [ref=e904]
          - list [ref=e905]:
            - listitem [ref=e906]:
              - article "Live Coding Stream" [ref=e907]:
                - generic [ref=e908]:
                  - generic [ref=e909]: 🎥
                  - generic [ref=e910]:
                    - generic [ref=e911]: STREAM
                    - heading "Live Coding Stream" [level=3] [ref=e912]
                    - paragraph [ref=e913]: Building a Stellar payment integration live.
                    - paragraph [ref=e914]: 🕐 Thu, Aug 20 at 4:34 PM UTC
                    - link "🔗 https://twitch.tv/example" [ref=e915]:
                      - /url: https://twitch.tv/example
                - generic [ref=e916]:
                  - button "Add to calendar" [ref=e918]: + Add to Calendar
                  - link "Join Event →" [ref=e919]:
                    - /url: https://twitch.tv/example
            - listitem [ref=e920]:
              - article "Weekly AMA" [ref=e921]:
                - generic [ref=e922]:
                  - generic [ref=e923]: 💬
                  - generic [ref=e924]:
                    - generic [ref=e925]: AMARecurring
                    - heading "Weekly AMA" [level=3] [ref=e926]
                    - paragraph [ref=e927]: Ask me anything about Web3 and Stellar.
                    - paragraph [ref=e928]: 🕐 Tue, Aug 25 at 4:34 PM UTC
                - button "Add to calendar" [ref=e931]: + Add to Calendar
        - region "Recommended Creators" [ref=e932]:
          - generic [ref=e934]:
            - heading "Recommended Creators" [level=2] [ref=e935]
            - paragraph [ref=e936]: Showing popular creators. Your recommendations improve as you explore.
          - list [ref=e937]:
            - listitem [ref=e938]:
              - link "View NFT Creator's profile" [ref=e939]:
                - /url: /creator/nft-creator
                - img "Avatar for NFT Creator" [ref=e940]
                - generic [ref=e941]:
                  - paragraph [ref=e942]: art
                  - paragraph [ref=e943]: NFT Creator
                  - paragraph [ref=e944]: Trending creator
                - generic [ref=e945]:
                  - paragraph [ref=e946]: 4,200
                  - paragraph [ref=e947]: followers
            - listitem [ref=e948]:
              - link "View Protocol Dev's profile" [ref=e949]:
                - /url: /creator/protocol-dev
                - img "Avatar for Protocol Dev" [ref=e950]
                - generic [ref=e951]:
                  - paragraph [ref=e952]: tech
                  - paragraph [ref=e953]: Protocol Dev
                  - paragraph [ref=e954]: Trending creator
                - generic [ref=e955]:
                  - paragraph [ref=e956]: 4,100
                  - paragraph [ref=e957]: followers
            - listitem [ref=e958]:
              - link "View Smart Contract Dev's profile" [ref=e959]:
                - /url: /creator/smart-contract-dev
                - img "Avatar for Smart Contract Dev" [ref=e960]
                - generic [ref=e961]:
                  - paragraph [ref=e962]: tech
                  - paragraph [ref=e963]: Smart Contract Dev
                  - paragraph [ref=e964]: Trending creator
                - generic [ref=e965]:
                  - paragraph [ref=e966]: 3,800
                  - paragraph [ref=e967]: followers
      - generic [ref=e968]:
        - generic [ref=e969]:
          - generic [ref=e971]: "Preferred asset: XLM"
          - heading "Send a Tip" [level=2] [ref=e972]
          - paragraph [ref=e973]: Support this creator directly using Stellar assets.
          - form "Send a tip to testuser" [ref=e974]:
            - generic [ref=e975]:
              - text: Amount
              - spinbutton "Amount" [ref=e976]
              - paragraph [ref=e977]: Amount in Stellar assets
            - generic [ref=e979]:
              - text: Asset Code
              - textbox "Asset Code" [ref=e980]:
                - /placeholder: XLM
                - text: XLM
              - paragraph [ref=e981]: e.g. XLM, USDC
            - generic [ref=e983]:
              - text: Message (optional)
              - textbox "Message (optional)" [ref=e984]:
                - /placeholder: Thanks for the great content!
              - paragraph [ref=e985]: A short message for the creator (max 200 characters)
            - button "Create Tip Intent" [ref=e988]
        - generic [ref=e989]:
          - heading "Share Creator" [level=3] [ref=e990]:
            - img [ref=e991]
            - text: Share Creator
          - generic [ref=e997]:
            - generic [ref=e998]:
              - generic [ref=e999]:
                - heading "Share profile" [level=2] [ref=e1000]
                - paragraph [ref=e1001]: Let your audience know about this creator.
              - button "Share" [ref=e1002]
            - generic [ref=e1003]:
              - text: "Current share counts:"
              - generic [ref=e1004]: Twitter 0
              - generic [ref=e1005]: Facebook 0
              - generic [ref=e1006]: LinkedIn 0
              - generic [ref=e1007]: Copied 0
        - generic [ref=e1008]:
          - heading "Creator Tag Cloud" [level=3] [ref=e1009]
          - generic [ref=e1010]:
            - heading "Popular Tags" [level=3] [ref=e1011]
            - generic [ref=e1013]: "#test-tag (1)"
  - generic [ref=e1014]:
    - img [ref=e1016]
    - button "Open Tanstack query devtools" [ref=e1084] [cursor=pointer]:
      - img [ref=e1085]
  - generic [ref=e1153]:
    - img [ref=e1155]
    - button "Open Tanstack query devtools" [ref=e1223] [cursor=pointer]:
      - img [ref=e1224]
  - alert [ref=e1292]
  - generic [ref=e1293]: "0"
```

# Test source

```ts
  1   | /**
  2   |  * Accessibility testing helpers for @axe-core/playwright.
  3   |  *
  4   |  * Usage:
  5   |  *   import { runAxe, forceTheme } from '../helpers/a11y';
  6   |  *   await forceTheme(page, 'dark');
  7   |  *   const violations = await runAxe(page);
  8   |  */
  9   | 
  10  | import AxeBuilder from '@axe-core/playwright';
  11  | import type { Page } from '@playwright/test';
  12  | import { expect } from '@playwright/test';
  13  | 
  14  | /** ImpactValue from axe-core */
  15  | type ImpactValue = 'minor' | 'moderate' | 'serious' | 'critical';
  16  | 
  17  | /**
  18  |  * Rules that produce known third-party / browser-default violations that we
  19  |  * cannot fix in our codebase.  Each entry MUST include an inline justification.
  20  |  */
  21  | const EXCLUDED_RULES: { id: string; reason: string }[] = [
  22  |   // next-themes injects a <script> tag before <head> content; axe flags it
  23  |   // as an html-has-lang timing issue during hydration — not fixable from app code.
  24  |   { id: 'html-has-lang', reason: 'Covered by locale layout; false-positive during SSR hydration in tests.' },
  25  | ];
  26  | 
  27  | /**
  28  |  * Run axe-core on the current page state and return violations.
  29  |  * Gated to serious + critical impact by default.
  30  |  *
  31  |  * @param page        Playwright Page
  32  |  * @param minImpact   Minimum violation impact level to include (default: 'serious')
  33  |  * @param include     Optional CSS selector to scope the scan to a subtree
  34  |  */
  35  | export async function runAxe(
  36  |   page: Page,
  37  |   minImpact: ImpactValue = 'serious',
  38  |   include?: string,
  39  | ): Promise<import('axe-core').Result[]> {
  40  |   const impactOrder: ImpactValue[] = ['minor', 'moderate', 'serious', 'critical'];
  41  |   const minIndex = impactOrder.indexOf(minImpact);
  42  | 
  43  |   let builder = new AxeBuilder({ page });
  44  | 
  45  |   EXCLUDED_RULES.forEach(({ id }) => builder = builder.disableRules([id]));
  46  | 
  47  |   if (include) {
  48  |     builder = builder.include(include);
  49  |   }
  50  | 
  51  |   const { violations } = await builder.analyze();
  52  | 
  53  |   return violations.filter(
  54  |     (v) => v.impact && impactOrder.indexOf(v.impact as ImpactValue) >= minIndex,
  55  |   );
  56  | }
  57  | 
  58  | /**
  59  |  * Assert zero serious/critical violations.  Prints a descriptive failure
  60  |  * message with each violation's help URL on failure.
  61  |  */
  62  | export async function expectNoViolations(
  63  |   page: Page,
  64  |   context = 'page',
  65  |   include?: string,
  66  | ): Promise<void> {
  67  |   const violations = await runAxe(page, 'serious', include);
  68  | 
  69  |   if (violations.length > 0) {
  70  |     const report = violations
  71  |       .map(
  72  |         (v) =>
  73  |           `[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}\n` +
  74  |           `  Help: ${v.helpUrl}\n` +
  75  |           `  Nodes (${v.nodes.length}):\n` +
  76  |           v.nodes
  77  |             .slice(0, 3)
  78  |             .map((n) => `    - ${n.html}`)
  79  |             .join('\n'),
  80  |       )
  81  |       .join('\n\n');
  82  | 
> 83  |     throw new Error(
      |           ^ Error: 2 axe violation(s) on dark theme > creator profile:
  84  |       `${violations.length} axe violation(s) on ${context}:\n\n${report}`,
  85  |     );
  86  |   }
  87  | 
  88  |   expect(violations).toHaveLength(0);
  89  | }
  90  | 
  91  | /**
  92  |  * Force a specific theme on the page by setting the class on <html> and
  93  |  * writing to localStorage so next-themes picks it up on reload.
  94  |  */
  95  | export async function forceTheme(page: Page, theme: 'light' | 'dark'): Promise<void> {
  96  |   await page.evaluate((t) => {
  97  |     // next-themes stores the value under this key by default
  98  |     localStorage.setItem('theme', t);
  99  |     document.documentElement.classList.toggle('dark', t === 'dark');
  100 |     document.documentElement.classList.toggle('light', t === 'light');
  101 |   }, theme);
  102 | }
  103 | 
  104 | /**
  105 |  * Navigate and wait for the page to fully settle (no network activity,
  106 |  * no pending animations) before running axe.
  107 |  */
  108 | export async function gotoAndSettle(page: Page, path: string): Promise<void> {
  109 |   await page.goto(path);
  110 |   // Hide Next.js dev overlay so it doesn't intercept pointer events
  111 |   await page.addStyleTag({
  112 |     content: 'nextjs-portal { display: none !important; }',
  113 |   });
  114 |   await page.waitForLoadState('networkidle');
  115 | }
  116 | 
```