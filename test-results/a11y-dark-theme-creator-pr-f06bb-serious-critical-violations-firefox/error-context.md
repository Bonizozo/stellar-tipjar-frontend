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
    - <div class="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan transition-all duration-700" style="width: 0%;" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1"></div>

[SERIOUS] aria-prohibited-attr: Ensure ARIA attributes are not prohibited for an element's role
  Help: https://dequeuniversity.com/rules/axe/4.10/aria-prohibited-attr?application=playwright
  Nodes (5):
    - <div style="width: 13px; height: 13px; background-color: rgba(15, 108, 123, 0.08); border-radius: 2.34px;" title="None" aria-label="Level 0: None"></div>
    - <div style="width: 13px; height: 13px; background-color: rgba(15, 108, 123, 0.25); border-radius: 2.34px;" title="Low" aria-label="Level 1: Low"></div>
    - <div style="width: 13px; height: 13px; background-color: rgba(15, 108, 123, 0.5); border-radius: 2.34px;" title="Medium" aria-label="Level 2: Medium"></div>
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]: Freighter not installed
      - 'status "WebSocket status: Offline" [ref=e5]': Offline
    - generic [ref=e6]:
      - link "Back to Explore" [ref=e9] [cursor=pointer]:
        - /url: /explore
        - button "Back to Explore" [ref=e10]:
          - img [ref=e11]
          - text: Back to Explore
      - generic [ref=e14]:
        - generic [ref=e15]:
          - generic [ref=e16]:
            - img "Test User's avatar" [ref=e18]
            - generic [ref=e19]:
              - heading "Test User" [level=1] [ref=e21]
              - paragraph [ref=e22]: "@testuser"
          - generic [ref=e23]:
            - link "QR Code" [ref=e24] [cursor=pointer]:
              - /url: /creator/testuser/qr
              - button "QR Code" [ref=e25]
            - link "View in AR" [ref=e26] [cursor=pointer]:
              - /url: /ar?mode=profile&username=testuser
              - img [ref=e27]
              - text: View in AR
            - button "Report @testuser" [ref=e33]: ⚑ Report
        - generic [ref=e34]:
          - paragraph [ref=e35]: A test creator
          - generic [ref=e36]:
            - paragraph [ref=e37]: Categories & Tags
            - generic [ref=e38]:
              - 'generic "Tag: art" [ref=e40]':
                - text: "#art"
                - img [ref=e41]
              - 'generic "Tag: test-tag" [ref=e44]':
                - text: "#test-tag"
                - img [ref=e45]
    - generic [ref=e47]:
      - generic [ref=e48]:
        - generic [ref=e49]:
          - heading "Matching Campaigns" [level=2] [ref=e50]
          - paragraph [ref=e51]: Active matching campaigns that boost tips for this creator.
          - paragraph [ref=e52]: No active matching campaigns right now.
        - generic [ref=e53]:
          - heading "Creator Statistics" [level=2] [ref=e54]
          - generic [ref=e55]:
            - generic [ref=e56]:
              - heading "Fundraising Goal" [level=2] [ref=e57]:
                - img [ref=e58]
                - text: Fundraising Goal
              - generic [ref=e60]:
                - heading "Funding Goal Progress" [level=3] [ref=e62]
                - generic [ref=e63]:
                  - generic [ref=e64]: 1,234.5 / 10,000 XLM
                  - generic [ref=e65]: 12.3%
                - paragraph [ref=e66]: 13% to Bronze
            - generic [ref=e67]:
              - generic [ref=e68]:
                - generic [ref=e69]:
                  - img [ref=e71]
                  - generic [ref=e73]:
                    - img [ref=e74]
                    - generic [ref=e76]: +12.5%
                - heading "1,234.5 XLM" [level=3] [ref=e77]:
                  - generic [ref=e78]: 1,234.5 XLM
                - paragraph [ref=e79]: Total Tips
                - application [ref=e84]
              - generic [ref=e89]:
                - generic [ref=e90]:
                  - img [ref=e92]
                  - generic [ref=e94]:
                    - img [ref=e95]
                    - generic [ref=e97]: +8.2%
                - heading "56" [level=3] [ref=e98]
                - paragraph [ref=e99]: Tip Count
                - application [ref=e104]
              - generic [ref=e109]:
                - generic [ref=e110]:
                  - img [ref=e112]
                  - generic [ref=e114]:
                    - img [ref=e115]
                    - generic [ref=e117]: "-2.4%"
                - heading "42" [level=3] [ref=e118]
                - paragraph [ref=e119]: Supporters
                - application [ref=e124]
            - generic [ref=e129]:
              - generic [ref=e130]:
                - heading "Tip History" [level=2] [ref=e131]
                - generic [ref=e132]:
                  - paragraph [ref=e133]: Tips over time (XLM)
                  - application [ref=e136]:
                    - generic [ref=e166]:
                      - generic [ref=e167]:
                        - generic [ref=e169]: Aug 5
                        - generic [ref=e171]: Aug 6
                        - generic [ref=e173]: Aug 7
                        - generic [ref=e175]: Aug 8
                        - generic [ref=e177]: Aug 9
                        - generic [ref=e179]: Aug 10
                        - generic [ref=e181]: Aug 11
                        - generic [ref=e183]: Aug 12
                        - generic [ref=e185]: Aug 13
                        - generic [ref=e187]: Aug 14
                        - generic [ref=e189]: Aug 15
                        - generic [ref=e191]: Aug 16
                        - generic [ref=e193]: Aug 17
                        - generic [ref=e195]: Aug 18
                      - generic [ref=e196]:
                        - generic [ref=e198]: "0"
                        - generic [ref=e200]: "35"
                        - generic [ref=e202]: "70"
                        - generic [ref=e204]: "105"
                        - generic [ref=e206]: "140"
              - generic [ref=e207]:
                - heading "Top Supporters" [level=2] [ref=e208]
                - generic [ref=e209]:
                  - paragraph [ref=e210]: Top Supporters
                  - list [ref=e211]:
                    - listitem [ref=e212]:
                      - text: "1"
                      - generic [ref=e213]:
                        - generic [ref=e214]:
                          - text: "@stellar-fan"
                          - generic [ref=e215]: 300 XLM
                        - paragraph [ref=e216]: 8 tips
                    - listitem [ref=e217]:
                      - text: "2"
                      - generic [ref=e218]:
                        - generic [ref=e219]:
                          - text: "@xlm-lover"
                          - generic [ref=e220]: 250 XLM
                        - paragraph [ref=e221]: 5 tips
                    - listitem [ref=e222]:
                      - text: "3"
                      - generic [ref=e223]:
                        - generic [ref=e224]:
                          - text: "@crypto-alice"
                          - generic [ref=e225]: 180 XLM
                        - paragraph [ref=e226]: 12 tips
                    - listitem [ref=e227]:
                      - text: "4"
                      - generic [ref=e228]:
                        - generic [ref=e229]:
                          - text: "@blockchainer"
                          - generic [ref=e230]: 120 XLM
                        - paragraph [ref=e231]: 3 tips
                    - listitem [ref=e232]:
                      - text: "5"
                      - generic [ref=e233]:
                        - generic [ref=e234]:
                          - text: "@defi-bob"
                          - generic [ref=e235]: 90 XLM
                        - paragraph [ref=e236]: 6 tips
            - generic [ref=e237]:
              - heading "Activity Heatmap" [level=2] [ref=e238]
              - generic [ref=e239]:
                - generic [ref=e240]:
                  - generic [ref=e241]:
                    - generic [ref=e242]:
                      - heading "testuser's Tip Activity" [level=3] [ref=e243]
                      - paragraph [ref=e244]: 470 tips · 187 active days
                    - generic [ref=e245]:
                      - generic [ref=e246]:
                        - button "1yr" [ref=e247]
                        - button "2yr" [ref=e248]
                        - button "3yr" [ref=e249]
                      - generic [ref=e250]:
                        - button "Previous year" [ref=e251]
                        - text: This year
                        - button "Next year" [disabled] [ref=e252]
                      - generic [ref=e253]:
                        - button "Ocean theme" [pressed] [ref=e254]
                        - button "Sunrise theme" [ref=e255]
                        - button "Moss theme" [ref=e256]
                        - button "Purple theme" [ref=e257]
                        - button "Mono theme" [ref=e258]
                  - generic [ref=e259]:
                    - grid "Tip activity heatmap" [ref=e260]:
                      - generic [ref=e261]:
                        - generic [ref=e262]:
                          - generic [ref=e263]: Aug
                          - generic [ref=e264]: Sep
                          - generic [ref=e265]: Oct
                          - generic [ref=e266]: Nov
                          - generic [ref=e267]: Dec
                          - generic [ref=e268]: Jan
                          - generic [ref=e269]: Feb
                          - generic [ref=e270]: Mar
                          - generic [ref=e271]: Apr
                          - generic [ref=e272]: May
                          - generic [ref=e273]: Jun
                          - generic [ref=e274]: Jul
                          - generic [ref=e275]: Aug
                        - generic [ref=e276]:
                          - generic [ref=e277]:
                            - generic [ref=e279]: Mon
                            - generic [ref=e281]: Wed
                            - generic [ref=e283]: Fri
                          - generic [ref=e285]:
                            - row "Week of 2025-08-17" [ref=e286]:
                              - 'gridcell "2025-08-17: no tips" [ref=e287] [cursor=pointer]'
                              - 'gridcell "2025-08-18: no tips" [ref=e288] [cursor=pointer]'
                              - 'gridcell "2025-08-19: 223.66 XLM, 4 tips" [ref=e289] [cursor=pointer]'
                              - 'gridcell "2025-08-20: 156.33 XLM, 2 tips" [ref=e290] [cursor=pointer]'
                              - 'gridcell "2025-08-21: no tips" [ref=e291] [cursor=pointer]'
                              - 'gridcell "2025-08-22: 82.13 XLM, 3 tips" [ref=e292] [cursor=pointer]'
                              - 'gridcell "2025-08-23: 82.31 XLM, 1 tip" [ref=e293] [cursor=pointer]'
                            - row "Week of 2025-08-24" [ref=e294]:
                              - 'gridcell "2025-08-24: 440.71 XLM, 4 tips" [ref=e295] [cursor=pointer]'
                              - 'gridcell "2025-08-25: no tips" [ref=e296] [cursor=pointer]'
                              - 'gridcell "2025-08-26: 295.00 XLM, 4 tips" [ref=e297] [cursor=pointer]'
                              - 'gridcell "2025-08-27: 186.95 XLM, 2 tips" [ref=e298] [cursor=pointer]'
                              - 'gridcell "2025-08-28: no tips" [ref=e299] [cursor=pointer]'
                              - 'gridcell "2025-08-29: no tips" [ref=e300] [cursor=pointer]'
                              - 'gridcell "2025-08-30: 204.10 XLM, 4 tips" [ref=e301] [cursor=pointer]'
                            - row "Week of 2025-08-31" [ref=e302]:
                              - 'gridcell "2025-08-31: no tips" [ref=e303] [cursor=pointer]'
                              - 'gridcell "2025-09-01: no tips" [ref=e304] [cursor=pointer]'
                              - 'gridcell "2025-09-02: no tips" [ref=e305] [cursor=pointer]'
                              - 'gridcell "2025-09-03: no tips" [ref=e306] [cursor=pointer]'
                              - 'gridcell "2025-09-04: 82.54 XLM, 2 tips" [ref=e307] [cursor=pointer]'
                              - 'gridcell "2025-09-05: 143.74 XLM, 3 tips" [ref=e308] [cursor=pointer]'
                              - 'gridcell "2025-09-06: no tips" [ref=e309] [cursor=pointer]'
                            - row "Week of 2025-09-07" [ref=e310]:
                              - 'gridcell "2025-09-07: no tips" [ref=e311] [cursor=pointer]'
                              - 'gridcell "2025-09-08: no tips" [ref=e312] [cursor=pointer]'
                              - 'gridcell "2025-09-09: no tips" [ref=e313] [cursor=pointer]'
                              - 'gridcell "2025-09-10: 174.91 XLM, 3 tips" [ref=e314] [cursor=pointer]'
                              - 'gridcell "2025-09-11: 240.40 XLM, 3 tips" [ref=e315] [cursor=pointer]'
                              - 'gridcell "2025-09-12: 303.95 XLM, 3 tips" [ref=e316] [cursor=pointer]'
                              - 'gridcell "2025-09-13: 207.79 XLM, 2 tips" [ref=e317] [cursor=pointer]'
                            - row "Week of 2025-09-14" [ref=e318]:
                              - 'gridcell "2025-09-14: 131.14 XLM, 3 tips" [ref=e319] [cursor=pointer]'
                              - 'gridcell "2025-09-15: no tips" [ref=e320] [cursor=pointer]'
                              - 'gridcell "2025-09-16: 61.26 XLM, 1 tip" [ref=e321] [cursor=pointer]'
                              - 'gridcell "2025-09-17: 280.09 XLM, 3 tips" [ref=e322] [cursor=pointer]'
                              - 'gridcell "2025-09-18: no tips" [ref=e323] [cursor=pointer]'
                              - 'gridcell "2025-09-19: no tips" [ref=e324] [cursor=pointer]'
                              - 'gridcell "2025-09-20: no tips" [ref=e325] [cursor=pointer]'
                            - row "Week of 2025-09-21" [ref=e326]:
                              - 'gridcell "2025-09-21: no tips" [ref=e327] [cursor=pointer]'
                              - 'gridcell "2025-09-22: 74.63 XLM, 1 tip" [ref=e328] [cursor=pointer]'
                              - 'gridcell "2025-09-23: 111.07 XLM, 2 tips" [ref=e329] [cursor=pointer]'
                              - 'gridcell "2025-09-24: 146.14 XLM, 4 tips" [ref=e330] [cursor=pointer]'
                              - 'gridcell "2025-09-25: no tips" [ref=e331] [cursor=pointer]'
                              - 'gridcell "2025-09-26: 148.91 XLM, 3 tips" [ref=e332] [cursor=pointer]'
                              - 'gridcell "2025-09-27: no tips" [ref=e333] [cursor=pointer]'
                            - row "Week of 2025-09-28" [ref=e334]:
                              - 'gridcell "2025-09-28: no tips" [ref=e335] [cursor=pointer]'
                              - 'gridcell "2025-09-29: no tips" [ref=e336] [cursor=pointer]'
                              - 'gridcell "2025-09-30: 232.75 XLM, 2 tips" [ref=e337] [cursor=pointer]'
                              - 'gridcell "2025-10-01: no tips" [ref=e338] [cursor=pointer]'
                              - 'gridcell "2025-10-02: no tips" [ref=e339] [cursor=pointer]'
                              - 'gridcell "2025-10-03: no tips" [ref=e340] [cursor=pointer]'
                              - 'gridcell "2025-10-04: no tips" [ref=e341] [cursor=pointer]'
                            - row "Week of 2025-10-05" [ref=e342]:
                              - 'gridcell "2025-10-05: no tips" [ref=e343] [cursor=pointer]'
                              - 'gridcell "2025-10-06: no tips" [ref=e344] [cursor=pointer]'
                              - 'gridcell "2025-10-07: 261.97 XLM, 4 tips" [ref=e345] [cursor=pointer]'
                              - 'gridcell "2025-10-08: no tips" [ref=e346] [cursor=pointer]'
                              - 'gridcell "2025-10-09: no tips" [ref=e347] [cursor=pointer]'
                              - 'gridcell "2025-10-10: no tips" [ref=e348] [cursor=pointer]'
                              - 'gridcell "2025-10-11: 63.20 XLM, 1 tip" [ref=e349] [cursor=pointer]'
                            - row "Week of 2025-10-12" [ref=e350]:
                              - 'gridcell "2025-10-12: no tips" [ref=e351] [cursor=pointer]'
                              - 'gridcell "2025-10-13: 192.67 XLM, 2 tips" [ref=e352] [cursor=pointer]'
                              - 'gridcell "2025-10-14: no tips" [ref=e353] [cursor=pointer]'
                              - 'gridcell "2025-10-15: no tips" [ref=e354] [cursor=pointer]'
                              - 'gridcell "2025-10-16: 73.63 XLM, 2 tips" [ref=e355] [cursor=pointer]'
                              - 'gridcell "2025-10-17: no tips" [ref=e356] [cursor=pointer]'
                              - 'gridcell "2025-10-18: 92.08 XLM, 2 tips" [ref=e357] [cursor=pointer]'
                            - row "Week of 2025-10-19" [ref=e358]:
                              - 'gridcell "2025-10-19: 119.20 XLM, 1 tip" [ref=e359] [cursor=pointer]'
                              - 'gridcell "2025-10-20: no tips" [ref=e360] [cursor=pointer]'
                              - 'gridcell "2025-10-21: 67.62 XLM, 1 tip" [ref=e361] [cursor=pointer]'
                              - 'gridcell "2025-10-22: no tips" [ref=e362] [cursor=pointer]'
                              - 'gridcell "2025-10-23: no tips" [ref=e363] [cursor=pointer]'
                              - 'gridcell "2025-10-24: 120.42 XLM, 2 tips" [ref=e364] [cursor=pointer]'
                              - 'gridcell "2025-10-25: no tips" [ref=e365] [cursor=pointer]'
                            - row "Week of 2025-10-26" [ref=e366]:
                              - 'gridcell "2025-10-26: 163.14 XLM, 3 tips" [ref=e367] [cursor=pointer]'
                              - 'gridcell "2025-10-27: 149.19 XLM, 3 tips" [ref=e368] [cursor=pointer]'
                              - 'gridcell "2025-10-28: no tips" [ref=e369] [cursor=pointer]'
                              - 'gridcell "2025-10-29: 255.82 XLM, 3 tips" [ref=e370] [cursor=pointer]'
                              - 'gridcell "2025-10-30: 88.39 XLM, 1 tip" [ref=e371] [cursor=pointer]'
                              - 'gridcell "2025-10-31: 19.27 XLM, 1 tip" [ref=e372] [cursor=pointer]'
                              - 'gridcell "2025-11-01: 240.47 XLM, 4 tips" [ref=e373] [cursor=pointer]'
                            - row "Week of 2025-11-02" [ref=e374]:
                              - 'gridcell "2025-11-02: 276.94 XLM, 4 tips" [ref=e375] [cursor=pointer]'
                              - 'gridcell "2025-11-03: no tips" [ref=e376] [cursor=pointer]'
                              - 'gridcell "2025-11-04: 79.40 XLM, 1 tip" [ref=e377] [cursor=pointer]'
                              - 'gridcell "2025-11-05: no tips" [ref=e378] [cursor=pointer]'
                              - 'gridcell "2025-11-06: 243.32 XLM, 3 tips" [ref=e379] [cursor=pointer]'
                              - 'gridcell "2025-11-07: 167.72 XLM, 4 tips" [ref=e380] [cursor=pointer]'
                              - 'gridcell "2025-11-08: no tips" [ref=e381] [cursor=pointer]'
                            - row "Week of 2025-11-09" [ref=e382]:
                              - 'gridcell "2025-11-09: 112.39 XLM, 3 tips" [ref=e383] [cursor=pointer]'
                              - 'gridcell "2025-11-10: 180.48 XLM, 2 tips" [ref=e384] [cursor=pointer]'
                              - 'gridcell "2025-11-11: no tips" [ref=e385] [cursor=pointer]'
                              - 'gridcell "2025-11-12: no tips" [ref=e386] [cursor=pointer]'
                              - 'gridcell "2025-11-13: 78.06 XLM, 2 tips" [ref=e387] [cursor=pointer]'
                              - 'gridcell "2025-11-14: 140.47 XLM, 4 tips" [ref=e388] [cursor=pointer]'
                              - 'gridcell "2025-11-15: 237.16 XLM, 4 tips" [ref=e389] [cursor=pointer]'
                            - row "Week of 2025-11-16" [ref=e390]:
                              - 'gridcell "2025-11-16: 328.01 XLM, 3 tips" [ref=e391] [cursor=pointer]'
                              - 'gridcell "2025-11-17: no tips" [ref=e392] [cursor=pointer]'
                              - 'gridcell "2025-11-18: no tips" [ref=e393] [cursor=pointer]'
                              - 'gridcell "2025-11-19: 184.66 XLM, 4 tips" [ref=e394] [cursor=pointer]'
                              - 'gridcell "2025-11-20: 145.56 XLM, 3 tips" [ref=e395] [cursor=pointer]'
                              - 'gridcell "2025-11-21: 42.60 XLM, 1 tip" [ref=e396] [cursor=pointer]'
                              - 'gridcell "2025-11-22: no tips" [ref=e397] [cursor=pointer]'
                            - row "Week of 2025-11-23" [ref=e398]:
                              - 'gridcell "2025-11-23: no tips" [ref=e399] [cursor=pointer]'
                              - 'gridcell "2025-11-24: 202.67 XLM, 2 tips" [ref=e400] [cursor=pointer]'
                              - 'gridcell "2025-11-25: 155.34 XLM, 3 tips" [ref=e401] [cursor=pointer]'
                              - 'gridcell "2025-11-26: 22.07 XLM, 1 tip" [ref=e402] [cursor=pointer]'
                              - 'gridcell "2025-11-27: no tips" [ref=e403] [cursor=pointer]'
                              - 'gridcell "2025-11-28: 81.76 XLM, 1 tip" [ref=e404] [cursor=pointer]'
                              - 'gridcell "2025-11-29: 205.27 XLM, 2 tips" [ref=e405] [cursor=pointer]'
                            - row "Week of 2025-11-30" [ref=e406]:
                              - 'gridcell "2025-11-30: no tips" [ref=e407] [cursor=pointer]'
                              - 'gridcell "2025-12-01: 245.86 XLM, 3 tips" [ref=e408] [cursor=pointer]'
                              - 'gridcell "2025-12-02: no tips" [ref=e409] [cursor=pointer]'
                              - 'gridcell "2025-12-03: 183.93 XLM, 4 tips" [ref=e410] [cursor=pointer]'
                              - 'gridcell "2025-12-04: 33.66 XLM, 1 tip" [ref=e411] [cursor=pointer]'
                              - 'gridcell "2025-12-05: 47.30 XLM, 2 tips" [ref=e412] [cursor=pointer]'
                              - 'gridcell "2025-12-06: 99.38 XLM, 1 tip" [ref=e413] [cursor=pointer]'
                            - row "Week of 2025-12-07" [ref=e414]:
                              - 'gridcell "2025-12-07: 272.81 XLM, 4 tips" [ref=e415] [cursor=pointer]'
                              - 'gridcell "2025-12-08: no tips" [ref=e416] [cursor=pointer]'
                              - 'gridcell "2025-12-09: 25.65 XLM, 1 tip" [ref=e417] [cursor=pointer]'
                              - 'gridcell "2025-12-10: no tips" [ref=e418] [cursor=pointer]'
                              - 'gridcell "2025-12-11: 296.02 XLM, 3 tips" [ref=e419] [cursor=pointer]'
                              - 'gridcell "2025-12-12: 93.82 XLM, 2 tips" [ref=e420] [cursor=pointer]'
                              - 'gridcell "2025-12-13: no tips" [ref=e421] [cursor=pointer]'
                            - row "Week of 2025-12-14" [ref=e422]:
                              - 'gridcell "2025-12-14: no tips" [ref=e423] [cursor=pointer]'
                              - 'gridcell "2025-12-15: no tips" [ref=e424] [cursor=pointer]'
                              - 'gridcell "2025-12-16: 183.18 XLM, 4 tips" [ref=e425] [cursor=pointer]'
                              - 'gridcell "2025-12-17: no tips" [ref=e426] [cursor=pointer]'
                              - 'gridcell "2025-12-18: 235.42 XLM, 4 tips" [ref=e427] [cursor=pointer]'
                              - 'gridcell "2025-12-19: no tips" [ref=e428] [cursor=pointer]'
                              - 'gridcell "2025-12-20: 109.89 XLM, 1 tip" [ref=e429] [cursor=pointer]'
                            - row "Week of 2025-12-21" [ref=e430]:
                              - 'gridcell "2025-12-21: no tips" [ref=e431] [cursor=pointer]'
                              - 'gridcell "2025-12-22: 55.10 XLM, 1 tip" [ref=e432] [cursor=pointer]'
                              - 'gridcell "2025-12-23: 151.86 XLM, 3 tips" [ref=e433] [cursor=pointer]'
                              - 'gridcell "2025-12-24: no tips" [ref=e434] [cursor=pointer]'
                              - 'gridcell "2025-12-25: 62.16 XLM, 1 tip" [ref=e435] [cursor=pointer]'
                              - 'gridcell "2025-12-26: no tips" [ref=e436] [cursor=pointer]'
                              - 'gridcell "2025-12-27: 238.34 XLM, 2 tips" [ref=e437] [cursor=pointer]'
                            - row "Week of 2025-12-28" [ref=e438]:
                              - 'gridcell "2025-12-28: no tips" [ref=e439] [cursor=pointer]'
                              - 'gridcell "2025-12-29: no tips" [ref=e440] [cursor=pointer]'
                              - 'gridcell "2025-12-30: no tips" [ref=e441] [cursor=pointer]'
                              - 'gridcell "2025-12-31: 73.18 XLM, 1 tip" [ref=e442] [cursor=pointer]'
                              - 'gridcell "2026-01-01: no tips" [ref=e443] [cursor=pointer]'
                              - 'gridcell "2026-01-02: no tips" [ref=e444] [cursor=pointer]'
                              - 'gridcell "2026-01-03: no tips" [ref=e445] [cursor=pointer]'
                            - row "Week of 2026-01-04" [ref=e446]:
                              - 'gridcell "2026-01-04: 310.60 XLM, 3 tips" [ref=e447] [cursor=pointer]'
                              - 'gridcell "2026-01-05: no tips" [ref=e448] [cursor=pointer]'
                              - 'gridcell "2026-01-06: 63.33 XLM, 1 tip" [ref=e449] [cursor=pointer]'
                              - 'gridcell "2026-01-07: no tips" [ref=e450] [cursor=pointer]'
                              - 'gridcell "2026-01-08: 310.47 XLM, 4 tips" [ref=e451] [cursor=pointer]'
                              - 'gridcell "2026-01-09: no tips" [ref=e452] [cursor=pointer]'
                              - 'gridcell "2026-01-10: 282.69 XLM, 4 tips" [ref=e453] [cursor=pointer]'
                            - row "Week of 2026-01-11" [ref=e454]:
                              - 'gridcell "2026-01-11: no tips" [ref=e455] [cursor=pointer]'
                              - 'gridcell "2026-01-12: 105.71 XLM, 2 tips" [ref=e456] [cursor=pointer]'
                              - 'gridcell "2026-01-13: 181.13 XLM, 3 tips" [ref=e457] [cursor=pointer]'
                              - 'gridcell "2026-01-14: 192.42 XLM, 3 tips" [ref=e458] [cursor=pointer]'
                              - 'gridcell "2026-01-15: no tips" [ref=e459] [cursor=pointer]'
                              - 'gridcell "2026-01-16: 223.62 XLM, 3 tips" [ref=e460] [cursor=pointer]'
                              - 'gridcell "2026-01-17: 74.71 XLM, 2 tips" [ref=e461] [cursor=pointer]'
                            - row "Week of 2026-01-18" [ref=e462]:
                              - 'gridcell "2026-01-18: no tips" [ref=e463] [cursor=pointer]'
                              - 'gridcell "2026-01-19: no tips" [ref=e464] [cursor=pointer]'
                              - 'gridcell "2026-01-20: no tips" [ref=e465] [cursor=pointer]'
                              - 'gridcell "2026-01-21: no tips" [ref=e466] [cursor=pointer]'
                              - 'gridcell "2026-01-22: 230.77 XLM, 3 tips" [ref=e467] [cursor=pointer]'
                              - 'gridcell "2026-01-23: 179.66 XLM, 3 tips" [ref=e468] [cursor=pointer]'
                              - 'gridcell "2026-01-24: 121.22 XLM, 2 tips" [ref=e469] [cursor=pointer]'
                            - row "Week of 2026-01-25" [ref=e470]:
                              - 'gridcell "2026-01-25: no tips" [ref=e471] [cursor=pointer]'
                              - 'gridcell "2026-01-26: 44.33 XLM, 2 tips" [ref=e472] [cursor=pointer]'
                              - 'gridcell "2026-01-27: no tips" [ref=e473] [cursor=pointer]'
                              - 'gridcell "2026-01-28: 38.70 XLM, 1 tip" [ref=e474] [cursor=pointer]'
                              - 'gridcell "2026-01-29: no tips" [ref=e475] [cursor=pointer]'
                              - 'gridcell "2026-01-30: 152.78 XLM, 3 tips" [ref=e476] [cursor=pointer]'
                              - 'gridcell "2026-01-31: 127.49 XLM, 4 tips" [ref=e477] [cursor=pointer]'
                            - row "Week of 2026-02-01" [ref=e478]:
                              - 'gridcell "2026-02-01: no tips" [ref=e479] [cursor=pointer]'
                              - 'gridcell "2026-02-02: 126.16 XLM, 2 tips" [ref=e480] [cursor=pointer]'
                              - 'gridcell "2026-02-03: 241.25 XLM, 4 tips" [ref=e481] [cursor=pointer]'
                              - 'gridcell "2026-02-04: 361.95 XLM, 4 tips" [ref=e482] [cursor=pointer]'
                              - 'gridcell "2026-02-05: no tips" [ref=e483] [cursor=pointer]'
                              - 'gridcell "2026-02-06: 201.37 XLM, 3 tips" [ref=e484] [cursor=pointer]'
                              - 'gridcell "2026-02-07: no tips" [ref=e485] [cursor=pointer]'
                            - row "Week of 2026-02-08" [ref=e486]:
                              - 'gridcell "2026-02-08: 63.94 XLM, 1 tip" [ref=e487] [cursor=pointer]'
                              - 'gridcell "2026-02-09: 81.00 XLM, 1 tip" [ref=e488] [cursor=pointer]'
                              - 'gridcell "2026-02-10: 24.60 XLM, 1 tip" [ref=e489] [cursor=pointer]'
                              - 'gridcell "2026-02-11: no tips" [ref=e490] [cursor=pointer]'
                              - 'gridcell "2026-02-12: 103.18 XLM, 3 tips" [ref=e491] [cursor=pointer]'
                              - 'gridcell "2026-02-13: 118.62 XLM, 1 tip" [ref=e492] [cursor=pointer]'
                              - 'gridcell "2026-02-14: 22.85 XLM, 1 tip" [ref=e493] [cursor=pointer]'
                            - row "Week of 2026-02-15" [ref=e494]:
                              - 'gridcell "2026-02-15: no tips" [ref=e495] [cursor=pointer]'
                              - 'gridcell "2026-02-16: no tips" [ref=e496] [cursor=pointer]'
                              - 'gridcell "2026-02-17: no tips" [ref=e497] [cursor=pointer]'
                              - 'gridcell "2026-02-18: 338.94 XLM, 4 tips" [ref=e498] [cursor=pointer]'
                              - 'gridcell "2026-02-19: 118.59 XLM, 2 tips" [ref=e499] [cursor=pointer]'
                              - 'gridcell "2026-02-20: no tips" [ref=e500] [cursor=pointer]'
                              - 'gridcell "2026-02-21: no tips" [ref=e501] [cursor=pointer]'
                            - row "Week of 2026-02-22" [ref=e502]:
                              - 'gridcell "2026-02-22: 221.15 XLM, 2 tips" [ref=e503] [cursor=pointer]'
                              - 'gridcell "2026-02-23: no tips" [ref=e504] [cursor=pointer]'
                              - 'gridcell "2026-02-24: 80.91 XLM, 2 tips" [ref=e505] [cursor=pointer]'
                              - 'gridcell "2026-02-25: no tips" [ref=e506] [cursor=pointer]'
                              - 'gridcell "2026-02-26: 184.74 XLM, 3 tips" [ref=e507] [cursor=pointer]'
                              - 'gridcell "2026-02-27: no tips" [ref=e508] [cursor=pointer]'
                              - 'gridcell "2026-02-28: no tips" [ref=e509] [cursor=pointer]'
                            - row "Week of 2026-03-01" [ref=e510]:
                              - 'gridcell "2026-03-01: no tips" [ref=e511] [cursor=pointer]'
                              - 'gridcell "2026-03-02: no tips" [ref=e512] [cursor=pointer]'
                              - 'gridcell "2026-03-03: no tips" [ref=e513] [cursor=pointer]'
                              - 'gridcell "2026-03-04: no tips" [ref=e514] [cursor=pointer]'
                              - 'gridcell "2026-03-05: 203.69 XLM, 3 tips" [ref=e515] [cursor=pointer]'
                              - 'gridcell "2026-03-06: 293.42 XLM, 3 tips" [ref=e516] [cursor=pointer]'
                              - 'gridcell "2026-03-07: 246.24 XLM, 3 tips" [ref=e517] [cursor=pointer]'
                            - row "Week of 2026-03-08" [ref=e518]:
                              - 'gridcell "2026-03-08: 126.30 XLM, 2 tips" [ref=e519] [cursor=pointer]'
                              - 'gridcell "2026-03-09: no tips" [ref=e520] [cursor=pointer]'
                              - 'gridcell "2026-03-10: no tips" [ref=e521] [cursor=pointer]'
                              - 'gridcell "2026-03-11: 126.45 XLM, 3 tips" [ref=e522] [cursor=pointer]'
                              - 'gridcell "2026-03-12: no tips" [ref=e523] [cursor=pointer]'
                              - 'gridcell "2026-03-13: 134.88 XLM, 2 tips" [ref=e524] [cursor=pointer]'
                              - 'gridcell "2026-03-14: no tips" [ref=e525] [cursor=pointer]'
                            - row "Week of 2026-03-15" [ref=e526]:
                              - 'gridcell "2026-03-15: 323.78 XLM, 4 tips" [ref=e527] [cursor=pointer]'
                              - 'gridcell "2026-03-16: 184.41 XLM, 3 tips" [ref=e528] [cursor=pointer]'
                              - 'gridcell "2026-03-17: no tips" [ref=e529] [cursor=pointer]'
                              - 'gridcell "2026-03-18: 63.98 XLM, 2 tips" [ref=e530] [cursor=pointer]'
                              - 'gridcell "2026-03-19: 281.83 XLM, 3 tips" [ref=e531] [cursor=pointer]'
                              - 'gridcell "2026-03-20: no tips" [ref=e532] [cursor=pointer]'
                              - 'gridcell "2026-03-21: no tips" [ref=e533] [cursor=pointer]'
                            - row "Week of 2026-03-22" [ref=e534]:
                              - 'gridcell "2026-03-22: 300.43 XLM, 4 tips" [ref=e535] [cursor=pointer]'
                              - 'gridcell "2026-03-23: 113.84 XLM, 1 tip" [ref=e536] [cursor=pointer]'
                              - 'gridcell "2026-03-24: no tips" [ref=e537] [cursor=pointer]'
                              - 'gridcell "2026-03-25: 98.60 XLM, 2 tips" [ref=e538] [cursor=pointer]'
                              - 'gridcell "2026-03-26: no tips" [ref=e539] [cursor=pointer]'
                              - 'gridcell "2026-03-27: 67.35 XLM, 2 tips" [ref=e540] [cursor=pointer]'
                              - 'gridcell "2026-03-28: 255.26 XLM, 4 tips" [ref=e541] [cursor=pointer]'
                            - row "Week of 2026-03-29" [ref=e542]:
                              - 'gridcell "2026-03-29: 144.96 XLM, 2 tips" [ref=e543] [cursor=pointer]'
                              - 'gridcell "2026-03-30: 136.99 XLM, 2 tips" [ref=e544] [cursor=pointer]'
                              - 'gridcell "2026-03-31: no tips" [ref=e545] [cursor=pointer]'
                              - 'gridcell "2026-04-01: 112.41 XLM, 1 tip" [ref=e546] [cursor=pointer]'
                              - 'gridcell "2026-04-02: no tips" [ref=e547] [cursor=pointer]'
                              - 'gridcell "2026-04-03: 214.19 XLM, 3 tips" [ref=e548] [cursor=pointer]'
                              - 'gridcell "2026-04-04: 113.49 XLM, 2 tips" [ref=e549] [cursor=pointer]'
                            - row "Week of 2026-04-05" [ref=e550]:
                              - 'gridcell "2026-04-05: 200.78 XLM, 3 tips" [ref=e551] [cursor=pointer]'
                              - 'gridcell "2026-04-06: 179.34 XLM, 3 tips" [ref=e552] [cursor=pointer]'
                              - 'gridcell "2026-04-07: no tips" [ref=e553] [cursor=pointer]'
                              - 'gridcell "2026-04-08: 19.35 XLM, 1 tip" [ref=e554] [cursor=pointer]'
                              - 'gridcell "2026-04-09: no tips" [ref=e555] [cursor=pointer]'
                              - 'gridcell "2026-04-10: 120.69 XLM, 1 tip" [ref=e556] [cursor=pointer]'
                              - 'gridcell "2026-04-11: 121.98 XLM, 2 tips" [ref=e557] [cursor=pointer]'
                            - row "Week of 2026-04-12" [ref=e558]:
                              - 'gridcell "2026-04-12: 315.90 XLM, 4 tips" [ref=e559] [cursor=pointer]'
                              - 'gridcell "2026-04-13: 266.12 XLM, 3 tips" [ref=e560] [cursor=pointer]'
                              - 'gridcell "2026-04-14: no tips" [ref=e561] [cursor=pointer]'
                              - 'gridcell "2026-04-15: no tips" [ref=e562] [cursor=pointer]'
                              - 'gridcell "2026-04-16: no tips" [ref=e563] [cursor=pointer]'
                              - 'gridcell "2026-04-17: no tips" [ref=e564] [cursor=pointer]'
                              - 'gridcell "2026-04-18: 173.77 XLM, 2 tips" [ref=e565] [cursor=pointer]'
                            - row "Week of 2026-04-19" [ref=e566]:
                              - 'gridcell "2026-04-19: 112.52 XLM, 1 tip" [ref=e567] [cursor=pointer]'
                              - 'gridcell "2026-04-20: no tips" [ref=e568] [cursor=pointer]'
                              - 'gridcell "2026-04-21: no tips" [ref=e569] [cursor=pointer]'
                              - 'gridcell "2026-04-22: no tips" [ref=e570] [cursor=pointer]'
                              - 'gridcell "2026-04-23: no tips" [ref=e571] [cursor=pointer]'
                              - 'gridcell "2026-04-24: no tips" [ref=e572] [cursor=pointer]'
                              - 'gridcell "2026-04-25: 194.32 XLM, 3 tips" [ref=e573] [cursor=pointer]'
                            - row "Week of 2026-04-26" [ref=e574]:
                              - 'gridcell "2026-04-26: 82.03 XLM, 2 tips" [ref=e575] [cursor=pointer]'
                              - 'gridcell "2026-04-27: no tips" [ref=e576] [cursor=pointer]'
                              - 'gridcell "2026-04-28: no tips" [ref=e577] [cursor=pointer]'
                              - 'gridcell "2026-04-29: no tips" [ref=e578] [cursor=pointer]'
                              - 'gridcell "2026-04-30: 64.81 XLM, 1 tip" [ref=e579] [cursor=pointer]'
                              - 'gridcell "2026-05-01: no tips" [ref=e580] [cursor=pointer]'
                              - 'gridcell "2026-05-02: no tips" [ref=e581] [cursor=pointer]'
                            - row "Week of 2026-05-03" [ref=e582]:
                              - 'gridcell "2026-05-03: no tips" [ref=e583] [cursor=pointer]'
                              - 'gridcell "2026-05-04: 101.92 XLM, 2 tips" [ref=e584] [cursor=pointer]'
                              - 'gridcell "2026-05-05: 244.89 XLM, 3 tips" [ref=e585] [cursor=pointer]'
                              - 'gridcell "2026-05-06: 330.12 XLM, 4 tips" [ref=e586] [cursor=pointer]'
                              - 'gridcell "2026-05-07: 122.25 XLM, 1 tip" [ref=e587] [cursor=pointer]'
                              - 'gridcell "2026-05-08: 158.26 XLM, 3 tips" [ref=e588] [cursor=pointer]'
                              - 'gridcell "2026-05-09: no tips" [ref=e589] [cursor=pointer]'
                            - row "Week of 2026-05-10" [ref=e590]:
                              - 'gridcell "2026-05-10: 159.14 XLM, 2 tips" [ref=e591] [cursor=pointer]'
                              - 'gridcell "2026-05-11: no tips" [ref=e592] [cursor=pointer]'
                              - 'gridcell "2026-05-12: 44.83 XLM, 3 tips" [ref=e593] [cursor=pointer]'
                              - 'gridcell "2026-05-13: no tips" [ref=e594] [cursor=pointer]'
                              - 'gridcell "2026-05-14: 35.80 XLM, 3 tips" [ref=e595] [cursor=pointer]'
                              - 'gridcell "2026-05-15: no tips" [ref=e596] [cursor=pointer]'
                              - 'gridcell "2026-05-16: no tips" [ref=e597] [cursor=pointer]'
                            - row "Week of 2026-05-17" [ref=e598]:
                              - 'gridcell "2026-05-17: no tips" [ref=e599] [cursor=pointer]'
                              - 'gridcell "2026-05-18: no tips" [ref=e600] [cursor=pointer]'
                              - 'gridcell "2026-05-19: no tips" [ref=e601] [cursor=pointer]'
                              - 'gridcell "2026-05-20: no tips" [ref=e602] [cursor=pointer]'
                              - 'gridcell "2026-05-21: 166.13 XLM, 4 tips" [ref=e603] [cursor=pointer]'
                              - 'gridcell "2026-05-22: no tips" [ref=e604] [cursor=pointer]'
                              - 'gridcell "2026-05-23: 138.99 XLM, 2 tips" [ref=e605] [cursor=pointer]'
                            - row "Week of 2026-05-24" [ref=e606]:
                              - 'gridcell "2026-05-24: 96.45 XLM, 1 tip" [ref=e607] [cursor=pointer]'
                              - 'gridcell "2026-05-25: 326.91 XLM, 4 tips" [ref=e608] [cursor=pointer]'
                              - 'gridcell "2026-05-26: 202.16 XLM, 2 tips" [ref=e609] [cursor=pointer]'
                              - 'gridcell "2026-05-27: no tips" [ref=e610] [cursor=pointer]'
                              - 'gridcell "2026-05-28: no tips" [ref=e611] [cursor=pointer]'
                              - 'gridcell "2026-05-29: 72.86 XLM, 3 tips" [ref=e612] [cursor=pointer]'
                              - 'gridcell "2026-05-30: no tips" [ref=e613] [cursor=pointer]'
                            - row "Week of 2026-05-31" [ref=e614]:
                              - 'gridcell "2026-05-31: 13.75 XLM, 1 tip" [ref=e615] [cursor=pointer]'
                              - 'gridcell "2026-06-01: no tips" [ref=e616] [cursor=pointer]'
                              - 'gridcell "2026-06-02: 111.61 XLM, 1 tip" [ref=e617] [cursor=pointer]'
                              - 'gridcell "2026-06-03: no tips" [ref=e618] [cursor=pointer]'
                              - 'gridcell "2026-06-04: no tips" [ref=e619] [cursor=pointer]'
                              - 'gridcell "2026-06-05: 154.86 XLM, 2 tips" [ref=e620] [cursor=pointer]'
                              - 'gridcell "2026-06-06: 109.39 XLM, 1 tip" [ref=e621] [cursor=pointer]'
                            - row "Week of 2026-06-07" [ref=e622]:
                              - 'gridcell "2026-06-07: 123.98 XLM, 1 tip" [ref=e623] [cursor=pointer]'
                              - 'gridcell "2026-06-08: no tips" [ref=e624] [cursor=pointer]'
                              - 'gridcell "2026-06-09: 248.99 XLM, 4 tips" [ref=e625] [cursor=pointer]'
                              - 'gridcell "2026-06-10: no tips" [ref=e626] [cursor=pointer]'
                              - 'gridcell "2026-06-11: 148.84 XLM, 2 tips" [ref=e627] [cursor=pointer]'
                              - 'gridcell "2026-06-12: 253.26 XLM, 4 tips" [ref=e628] [cursor=pointer]'
                              - 'gridcell "2026-06-13: no tips" [ref=e629] [cursor=pointer]'
                            - row "Week of 2026-06-14" [ref=e630]:
                              - 'gridcell "2026-06-14: 273.20 XLM, 3 tips" [ref=e631] [cursor=pointer]'
                              - 'gridcell "2026-06-15: 204.26 XLM, 3 tips" [ref=e632] [cursor=pointer]'
                              - 'gridcell "2026-06-16: 33.33 XLM, 1 tip" [ref=e633] [cursor=pointer]'
                              - 'gridcell "2026-06-17: no tips" [ref=e634] [cursor=pointer]'
                              - 'gridcell "2026-06-18: no tips" [ref=e635] [cursor=pointer]'
                              - 'gridcell "2026-06-19: no tips" [ref=e636] [cursor=pointer]'
                              - 'gridcell "2026-06-20: 206.16 XLM, 2 tips" [ref=e637] [cursor=pointer]'
                            - row "Week of 2026-06-21" [ref=e638]:
                              - 'gridcell "2026-06-21: no tips" [ref=e639] [cursor=pointer]'
                              - 'gridcell "2026-06-22: no tips" [ref=e640] [cursor=pointer]'
                              - 'gridcell "2026-06-23: no tips" [ref=e641] [cursor=pointer]'
                              - 'gridcell "2026-06-24: 194.28 XLM, 3 tips" [ref=e642] [cursor=pointer]'
                              - 'gridcell "2026-06-25: no tips" [ref=e643] [cursor=pointer]'
                              - 'gridcell "2026-06-26: no tips" [ref=e644] [cursor=pointer]'
                              - 'gridcell "2026-06-27: no tips" [ref=e645] [cursor=pointer]'
                            - row "Week of 2026-06-28" [ref=e646]:
                              - 'gridcell "2026-06-28: 295.85 XLM, 3 tips" [ref=e647] [cursor=pointer]'
                              - 'gridcell "2026-06-29: no tips" [ref=e648] [cursor=pointer]'
                              - 'gridcell "2026-06-30: no tips" [ref=e649] [cursor=pointer]'
                              - 'gridcell "2026-07-01: no tips" [ref=e650] [cursor=pointer]'
                              - 'gridcell "2026-07-02: 176.35 XLM, 3 tips" [ref=e651] [cursor=pointer]'
                              - 'gridcell "2026-07-03: 266.31 XLM, 3 tips" [ref=e652] [cursor=pointer]'
                              - 'gridcell "2026-07-04: no tips" [ref=e653] [cursor=pointer]'
                            - row "Week of 2026-07-05" [ref=e654]:
                              - 'gridcell "2026-07-05: 184.36 XLM, 3 tips" [ref=e655] [cursor=pointer]'
                              - 'gridcell "2026-07-06: no tips" [ref=e656] [cursor=pointer]'
                              - 'gridcell "2026-07-07: 273.39 XLM, 4 tips" [ref=e657] [cursor=pointer]'
                              - 'gridcell "2026-07-08: no tips" [ref=e658] [cursor=pointer]'
                              - 'gridcell "2026-07-09: no tips" [ref=e659] [cursor=pointer]'
                              - 'gridcell "2026-07-10: no tips" [ref=e660] [cursor=pointer]'
                              - 'gridcell "2026-07-11: 181.39 XLM, 3 tips" [ref=e661] [cursor=pointer]'
                            - row "Week of 2026-07-12" [ref=e662]:
                              - 'gridcell "2026-07-12: no tips" [ref=e663] [cursor=pointer]'
                              - 'gridcell "2026-07-13: 253.57 XLM, 4 tips" [ref=e664] [cursor=pointer]'
                              - 'gridcell "2026-07-14: 291.28 XLM, 4 tips" [ref=e665] [cursor=pointer]'
                              - 'gridcell "2026-07-15: no tips" [ref=e666] [cursor=pointer]'
                              - 'gridcell "2026-07-16: no tips" [ref=e667] [cursor=pointer]'
                              - 'gridcell "2026-07-17: 227.30 XLM, 4 tips" [ref=e668] [cursor=pointer]'
                              - 'gridcell "2026-07-18: 280.49 XLM, 4 tips" [ref=e669] [cursor=pointer]'
                            - row "Week of 2026-07-19" [ref=e670]:
                              - 'gridcell "2026-07-19: no tips" [ref=e671] [cursor=pointer]'
                              - 'gridcell "2026-07-20: no tips" [ref=e672] [cursor=pointer]'
                              - 'gridcell "2026-07-21: no tips" [ref=e673] [cursor=pointer]'
                              - 'gridcell "2026-07-22: no tips" [ref=e674] [cursor=pointer]'
                              - 'gridcell "2026-07-23: no tips" [ref=e675] [cursor=pointer]'
                              - 'gridcell "2026-07-24: no tips" [ref=e676] [cursor=pointer]'
                              - 'gridcell "2026-07-25: no tips" [ref=e677] [cursor=pointer]'
                            - row "Week of 2026-07-26" [ref=e678]:
                              - 'gridcell "2026-07-26: no tips" [ref=e679] [cursor=pointer]'
                              - 'gridcell "2026-07-27: 293.74 XLM, 4 tips" [ref=e680] [cursor=pointer]'
                              - 'gridcell "2026-07-28: 58.67 XLM, 2 tips" [ref=e681] [cursor=pointer]'
                              - 'gridcell "2026-07-29: no tips" [ref=e682] [cursor=pointer]'
                              - 'gridcell "2026-07-30: 44.39 XLM, 1 tip" [ref=e683] [cursor=pointer]'
                              - 'gridcell "2026-07-31: 122.82 XLM, 2 tips" [ref=e684] [cursor=pointer]'
                              - 'gridcell "2026-08-01: 130.34 XLM, 2 tips" [ref=e685] [cursor=pointer]'
                            - row "Week of 2026-08-02" [ref=e686]:
                              - 'gridcell "2026-08-02: no tips" [ref=e687] [cursor=pointer]'
                              - 'gridcell "2026-08-03: no tips" [ref=e688] [cursor=pointer]'
                              - 'gridcell "2026-08-04: no tips" [ref=e689] [cursor=pointer]'
                              - 'gridcell "2026-08-05: 252.98 XLM, 4 tips" [ref=e690] [cursor=pointer]'
                              - 'gridcell "2026-08-06: 93.60 XLM, 1 tip" [ref=e691] [cursor=pointer]'
                              - 'gridcell "2026-08-07: 26.37 XLM, 1 tip" [ref=e692] [cursor=pointer]'
                              - 'gridcell "2026-08-08: 276.35 XLM, 4 tips" [ref=e693] [cursor=pointer]'
                            - row "Week of 2026-08-09" [ref=e694]:
                              - 'gridcell "2026-08-09: 188.66 XLM, 3 tips" [ref=e695] [cursor=pointer]'
                              - 'gridcell "2026-08-10: 158.19 XLM, 3 tips" [ref=e696] [cursor=pointer]'
                              - 'gridcell "2026-08-11: 28.46 XLM, 1 tip" [ref=e697] [cursor=pointer]'
                              - 'gridcell "2026-08-12: 264.84 XLM, 3 tips" [ref=e698] [cursor=pointer]'
                              - 'gridcell "2026-08-13: 242.70 XLM, 3 tips" [ref=e699] [cursor=pointer]'
                              - 'gridcell "2026-08-14: no tips" [ref=e700] [cursor=pointer]'
                              - 'gridcell "2026-08-15: no tips" [ref=e701] [cursor=pointer]'
                            - row "Week of 2026-08-16" [ref=e702]:
                              - 'gridcell "2026-08-16: no tips" [ref=e703] [cursor=pointer]'
                              - 'gridcell "2026-08-17: 326.15 XLM, 4 tips" [ref=e704] [cursor=pointer]'
                              - 'gridcell "2026-08-18: 222.44 XLM, 4 tips" [ref=e705] [cursor=pointer]'
                              - 'gridcell "2026-08-19: future" [ref=e706]'
                              - 'gridcell "2026-08-20: future" [ref=e707]'
                              - 'gridcell "2026-08-21: future" [ref=e708]'
                              - 'gridcell "2026-08-22: future" [ref=e709]'
                    - generic [ref=e710]:
                      - generic "Activity level legend" [ref=e711]:
                        - text: Less
                        - 'generic "Level 0: None" [ref=e712]'
                        - 'generic "Level 1: Low" [ref=e713]'
                        - 'generic "Level 2: Medium" [ref=e714]'
                        - 'generic "Level 3: High" [ref=e715]'
                        - 'generic "Level 4: Peak" [ref=e716]'
                        - text: More
                      - paragraph [ref=e717]: Today is highlighted with a border
                - generic [ref=e718]:
                  - generic [ref=e719]:
                    - img [ref=e721]
                    - generic [ref=e723]:
                      - paragraph [ref=e724]: Total Earned
                      - paragraph [ref=e725]: 30,969.6 XLM
                  - generic [ref=e726]:
                    - img [ref=e728]
                    - generic [ref=e730]:
                      - paragraph [ref=e731]: Total Tips
                      - paragraph [ref=e732]: "470"
                      - paragraph [ref=e733]: 187 active days
                  - generic [ref=e734]:
                    - img [ref=e736]
                    - generic [ref=e738]:
                      - paragraph [ref=e739]: Avg / Active Day
                      - paragraph [ref=e740]: 165.6 XLM
                  - generic [ref=e741]:
                    - img [ref=e743]
                    - generic [ref=e746]:
                      - paragraph [ref=e747]: Current Streak
                      - paragraph [ref=e748]: 2 days
                  - generic [ref=e749]:
                    - img [ref=e751]
                    - generic [ref=e753]:
                      - paragraph [ref=e754]: Longest Streak
                      - paragraph [ref=e755]: 9 days
                  - generic [ref=e756]:
                    - img [ref=e758]
                    - generic [ref=e760]:
                      - paragraph [ref=e761]: Best Day
                      - paragraph [ref=e762]: 440.7 XLM
                      - paragraph [ref=e763]: Aug 24
        - paragraph [ref=e765]: No portfolio items yet.
        - region "Tip milestones" [ref=e766]:
          - heading "Milestones" [level=2] [ref=e767]
          - paragraph [ref=e768]: No milestones yet — the first tip unlocks one! 🌱
          - generic [ref=e769]:
            - generic [ref=e770]:
              - generic [ref=e771]: 0 tips
              - generic [ref=e772]: "Next: 🌱 First Tip! (1)"
            - generic:
              - progressbar
        - generic [ref=e773]:
          - heading "Tip History" [level=2] [ref=e774]
          - generic [ref=e775]:
            - generic [ref=e776]:
              - generic [ref=e777]: 8 tips
              - text: Virtual scroll active
            - generic [ref=e778]:
              - table [ref=e779]:
                - rowgroup [ref=e780]:
                  - row "Date Amount Recipient Status Memo Transaction Actions" [ref=e781]:
                    - columnheader "Date" [ref=e782]:
                      - button "Date" [ref=e783]:
                        - text: Date
                        - img [ref=e784]
                    - columnheader "Amount" [ref=e786]:
                      - button "Amount" [ref=e787]:
                        - text: Amount
                        - img [ref=e788]
                    - columnheader "Recipient" [ref=e790]:
                      - button "Recipient" [ref=e791]:
                        - text: Recipient
                        - img [ref=e792]
                    - columnheader "Status" [ref=e794]:
                      - button "Status" [ref=e795]:
                        - text: Status
                        - img [ref=e796]
                    - columnheader "Memo" [ref=e798]
                    - columnheader "Transaction" [ref=e799]
                    - columnheader "Actions" [ref=e800]
              - region "Tip history rows" [ref=e801]:
                - table [ref=e802]:
                  - rowgroup [ref=e803]:
                    - row "Mar 20, 2024, 04:00 PM 50 XLM @alice Completed Great content! abc123... Receipt" [ref=e804]:
                      - cell "Mar 20, 2024, 04:00 PM" [ref=e805]
                      - cell "50 XLM" [ref=e806]
                      - cell "@alice" [ref=e807]:
                        - link "@alice" [ref=e808] [cursor=pointer]:
                          - /url: /creator/alice
                      - cell "Completed" [ref=e809]
                      - cell "Great content!" [ref=e810]
                      - cell "abc123..." [ref=e811]:
                        - link "abc123..." [ref=e812] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/abc123
                      - cell "Receipt" [ref=e813]:
                        - button "Receipt" [ref=e814]:
                          - img [ref=e815]
                          - text: Receipt
                    - row "Mar 19, 2024, 09:15 PM 25 XLM @stellar-dev Completed - def456... Receipt" [ref=e817]:
                      - cell "Mar 19, 2024, 09:15 PM" [ref=e818]
                      - cell "25 XLM" [ref=e819]
                      - cell "@stellar-dev" [ref=e820]:
                        - link "@stellar-dev" [ref=e821] [cursor=pointer]:
                          - /url: /creator/stellar-dev
                      - cell "Completed" [ref=e822]
                      - cell "-" [ref=e823]
                      - cell "def456..." [ref=e824]:
                        - link "def456..." [ref=e825] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/def456
                      - cell "Receipt" [ref=e826]:
                        - button "Receipt" [ref=e827]:
                          - img [ref=e828]
                          - text: Receipt
                    - row "Mar 18, 2024, 02:45 PM 100 XLM @pixelmaker Pending - - Receipt" [ref=e830]:
                      - cell "Mar 18, 2024, 02:45 PM" [ref=e831]
                      - cell "100 XLM" [ref=e832]
                      - cell "@pixelmaker" [ref=e833]:
                        - link "@pixelmaker" [ref=e834] [cursor=pointer]:
                          - /url: /creator/pixelmaker
                      - cell "Pending" [ref=e835]
                      - cell "-" [ref=e836]
                      - cell "-" [ref=e837]
                      - cell "Receipt" [ref=e838]:
                        - button "Receipt" [ref=e839]:
                          - img [ref=e840]
                          - text: Receipt
                    - row "Mar 17, 2024, 07:50 PM 15 XLM @crypto-artist Completed - ghi789... Receipt" [ref=e842]:
                      - cell "Mar 17, 2024, 07:50 PM" [ref=e843]
                      - cell "15 XLM" [ref=e844]
                      - cell "@crypto-artist" [ref=e845]:
                        - link "@crypto-artist" [ref=e846] [cursor=pointer]:
                          - /url: /creator/crypto-artist
                      - cell "Completed" [ref=e847]
                      - cell "-" [ref=e848]
                      - cell "ghi789..." [ref=e849]:
                        - link "ghi789..." [ref=e850] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/ghi789
                      - cell "Receipt" [ref=e851]:
                        - button "Receipt" [ref=e852]:
                          - img [ref=e853]
                          - text: Receipt
                    - row "Mar 16, 2024, 04:30 PM 75 XLM @blockchain-edu Failed - - Receipt" [ref=e855]:
                      - cell "Mar 16, 2024, 04:30 PM" [ref=e856]
                      - cell "75 XLM" [ref=e857]
                      - cell "@blockchain-edu" [ref=e858]:
                        - link "@blockchain-edu" [ref=e859] [cursor=pointer]:
                          - /url: /creator/blockchain-edu
                      - cell "Failed" [ref=e860]
                      - cell "-" [ref=e861]
                      - cell "-" [ref=e862]
                      - cell "Receipt" [ref=e863]:
                        - button "Receipt" [ref=e864]:
                          - img [ref=e865]
                          - text: Receipt
                    - row "Mar 15, 2024, 10:00 PM 30 XLM @community-lab Completed - jkl012... Receipt" [ref=e867]:
                      - cell "Mar 15, 2024, 10:00 PM" [ref=e868]
                      - cell "30 XLM" [ref=e869]
                      - cell "@community-lab" [ref=e870]:
                        - link "@community-lab" [ref=e871] [cursor=pointer]:
                          - /url: /creator/community-lab
                      - cell "Completed" [ref=e872]
                      - cell "-" [ref=e873]
                      - cell "jkl012..." [ref=e874]:
                        - link "jkl012..." [ref=e875] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/jkl012
                      - cell "Receipt" [ref=e876]:
                        - button "Receipt" [ref=e877]:
                          - img [ref=e878]
                          - text: Receipt
                    - row "Mar 14, 2024, 07:15 PM 200 XLM @nft-creator Completed Amazing work! mno345... Receipt" [ref=e880]:
                      - cell "Mar 14, 2024, 07:15 PM" [ref=e881]
                      - cell "200 XLM" [ref=e882]
                      - cell "@nft-creator" [ref=e883]:
                        - link "@nft-creator" [ref=e884] [cursor=pointer]:
                          - /url: /creator/nft-creator
                      - cell "Completed" [ref=e885]
                      - cell "Amazing work!" [ref=e886]
                      - cell "mno345..." [ref=e887]:
                        - link "mno345..." [ref=e888] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/mno345
                      - cell "Receipt" [ref=e889]:
                        - button "Receipt" [ref=e890]:
                          - img [ref=e891]
                          - text: Receipt
                    - row "Mar 13, 2024, 03:40 PM 45 XLM @defi-expert Completed - pqr678... Receipt" [ref=e893]:
                      - cell "Mar 13, 2024, 03:40 PM" [ref=e894]
                      - cell "45 XLM" [ref=e895]
                      - cell "@defi-expert" [ref=e896]:
                        - link "@defi-expert" [ref=e897] [cursor=pointer]:
                          - /url: /creator/defi-expert
                      - cell "Completed" [ref=e898]
                      - cell "-" [ref=e899]
                      - cell "pqr678..." [ref=e900]:
                        - link "pqr678..." [ref=e901] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/pqr678
                      - cell "Receipt" [ref=e902]:
                        - button "Receipt" [ref=e903]:
                          - img [ref=e904]
                          - text: Receipt
        - generic [ref=e906]:
          - heading "Comments (0)" [level=2] [ref=e907]
          - generic [ref=e908]:
            - textbox "Add a comment..." [ref=e909]
            - button "Post Comment" [disabled] [ref=e910]
        - region "Events" [ref=e911]:
          - generic [ref=e913]:
            - heading "Events" [level=2] [ref=e914]
            - paragraph [ref=e915]: 2 upcoming · 0 past
          - generic [ref=e916]:
            - button "upcoming" [pressed] [ref=e917]
            - button "past" [ref=e918]
          - list [ref=e919]:
            - listitem [ref=e920]:
              - article "Live Coding Stream" [ref=e921]:
                - generic [ref=e922]:
                  - generic [ref=e923]: 🎥
                  - generic [ref=e924]:
                    - generic [ref=e925]: STREAM
                    - heading "Live Coding Stream" [level=3] [ref=e926]
                    - paragraph [ref=e927]: Building a Stellar payment integration live.
                    - paragraph [ref=e928]: 🕐 Thu, Aug 20, 4:32 PM UTC
                    - link "🔗 https://twitch.tv/example" [ref=e929] [cursor=pointer]:
                      - /url: https://twitch.tv/example
                - generic [ref=e930]:
                  - button "Add to calendar" [ref=e932]: + Add to Calendar
                  - link "Join Event →" [ref=e933] [cursor=pointer]:
                    - /url: https://twitch.tv/example
            - listitem [ref=e934]:
              - article "Weekly AMA" [ref=e935]:
                - generic [ref=e936]:
                  - generic [ref=e937]: 💬
                  - generic [ref=e938]:
                    - generic [ref=e939]: AMARecurring
                    - heading "Weekly AMA" [level=3] [ref=e940]
                    - paragraph [ref=e941]: Ask me anything about Web3 and Stellar.
                    - paragraph [ref=e942]: 🕐 Tue, Aug 25, 4:32 PM UTC
                - button "Add to calendar" [ref=e945]: + Add to Calendar
        - region "Recommended Creators" [ref=e946]:
          - generic [ref=e948]:
            - heading "Recommended Creators" [level=2] [ref=e949]
            - paragraph [ref=e950]: Showing popular creators. Your recommendations improve as you explore.
          - list [ref=e951]:
            - listitem [ref=e952]:
              - link "View NFT Creator's profile" [ref=e953] [cursor=pointer]:
                - /url: /creator/nft-creator
                - img "Avatar for NFT Creator" [ref=e954]
                - generic [ref=e955]:
                  - paragraph [ref=e956]: art
                  - paragraph [ref=e957]: NFT Creator
                  - paragraph [ref=e958]: Trending creator
                - generic [ref=e959]:
                  - paragraph [ref=e960]: 4,200
                  - paragraph [ref=e961]: followers
            - listitem [ref=e962]:
              - link "View Protocol Dev's profile" [ref=e963] [cursor=pointer]:
                - /url: /creator/protocol-dev
                - img "Avatar for Protocol Dev" [ref=e964]
                - generic [ref=e965]:
                  - paragraph [ref=e966]: tech
                  - paragraph [ref=e967]: Protocol Dev
                  - paragraph [ref=e968]: Trending creator
                - generic [ref=e969]:
                  - paragraph [ref=e970]: 4,100
                  - paragraph [ref=e971]: followers
            - listitem [ref=e972]:
              - link "View Smart Contract Dev's profile" [ref=e973] [cursor=pointer]:
                - /url: /creator/smart-contract-dev
                - img "Avatar for Smart Contract Dev" [ref=e974]
                - generic [ref=e975]:
                  - paragraph [ref=e976]: tech
                  - paragraph [ref=e977]: Smart Contract Dev
                  - paragraph [ref=e978]: Trending creator
                - generic [ref=e979]:
                  - paragraph [ref=e980]: 3,800
                  - paragraph [ref=e981]: followers
      - generic [ref=e982]:
        - generic [ref=e983]:
          - generic [ref=e985]: "Preferred asset: XLM"
          - heading "Send a Tip" [level=2] [ref=e986]
          - paragraph [ref=e987]: Support this creator directly using Stellar assets.
          - form "Send a tip to testuser" [ref=e988]:
            - generic [ref=e989]:
              - text: Amount
              - spinbutton "Amount" [ref=e990]
              - paragraph [ref=e991]: Amount in Stellar assets
            - generic [ref=e993]:
              - text: Asset Code
              - textbox "Asset Code" [ref=e994]:
                - /placeholder: XLM
                - text: XLM
              - paragraph [ref=e995]: e.g. XLM, USDC
            - generic [ref=e997]:
              - text: Message (optional)
              - textbox "Message (optional)" [ref=e998]:
                - /placeholder: Thanks for the great content!
              - paragraph [ref=e999]: A short message for the creator (max 200 characters)
            - button "Create Tip Intent" [ref=e1002]
        - generic [ref=e1003]:
          - heading "Share Creator" [level=3] [ref=e1004]:
            - img [ref=e1005]
            - text: Share Creator
          - generic [ref=e1011]:
            - generic [ref=e1012]:
              - generic [ref=e1013]:
                - heading "Share profile" [level=2] [ref=e1014]
                - paragraph [ref=e1015]: Let your audience know about this creator.
              - button "Share" [ref=e1016]
            - generic [ref=e1017]:
              - text: "Current share counts:"
              - generic [ref=e1018]: Twitter 0
              - generic [ref=e1019]: Facebook 0
              - generic [ref=e1020]: LinkedIn 0
              - generic [ref=e1021]: Copied 0
        - generic [ref=e1022]:
          - heading "Creator Tag Cloud" [level=3] [ref=e1023]
          - generic [ref=e1024]:
            - heading "Popular Tags" [level=3] [ref=e1025]
            - generic [ref=e1027]: "#test-tag (1)"
  - generic [ref=e1028]:
    - img [ref=e1030]
    - button "Open Tanstack query devtools" [ref=e1079] [cursor=pointer]:
      - img [ref=e1080]
  - generic [ref=e1129]:
    - img [ref=e1131]
    - button "Open Tanstack query devtools" [ref=e1180] [cursor=pointer]:
      - img [ref=e1181]
  - alert [ref=e1230]
  - generic [ref=e1231]: "0"
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