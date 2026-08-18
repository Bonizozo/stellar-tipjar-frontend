# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> light theme >> creator profile has no serious/critical violations
- Location: tests/e2e/a11y.spec.ts:28:11

# Error details

```
Error: 2 axe violation(s) on light theme > creator profile:

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
      - link "Back to Explore" [ref=e9] [cursor=pointer]:
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
            - link "QR Code" [ref=e23] [cursor=pointer]:
              - /url: /creator/testuser/qr
              - button "QR Code" [ref=e24]
            - link "View in AR" [ref=e25] [cursor=pointer]:
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
              - generic [ref=e88]:
                - generic [ref=e89]:
                  - img [ref=e91]
                  - generic [ref=e93]:
                    - img [ref=e94]
                    - generic [ref=e96]: +8.2%
                - heading "56" [level=3] [ref=e97]
                - paragraph [ref=e98]: Tip Count
                - application [ref=e103]
              - generic [ref=e108]:
                - generic [ref=e109]:
                  - img [ref=e111]
                  - generic [ref=e113]:
                    - img [ref=e114]
                    - generic [ref=e116]: "-2.4%"
                - heading "42" [level=3] [ref=e117]
                - paragraph [ref=e118]: Supporters
                - application [ref=e123]
            - generic [ref=e128]:
              - generic [ref=e129]:
                - heading "Tip History" [level=2] [ref=e130]
                - generic [ref=e131]:
                  - paragraph [ref=e132]: Tips over time (XLM)
                  - application [ref=e135]:
                    - generic [ref=e146]:
                      - generic [ref=e147]:
                        - generic [ref=e149]: Aug 5
                        - generic [ref=e151]: Aug 6
                        - generic [ref=e153]: Aug 7
                        - generic [ref=e155]: Aug 8
                        - generic [ref=e157]: Aug 9
                        - generic [ref=e159]: Aug 10
                        - generic [ref=e161]: Aug 11
                        - generic [ref=e163]: Aug 12
                        - generic [ref=e165]: Aug 13
                        - generic [ref=e167]: Aug 14
                        - generic [ref=e169]: Aug 15
                        - generic [ref=e171]: Aug 16
                        - generic [ref=e173]: Aug 17
                        - generic [ref=e175]: Aug 18
                      - generic [ref=e176]:
                        - generic [ref=e178]: "0"
                        - generic [ref=e180]: "40"
                        - generic [ref=e182]: "80"
                        - generic [ref=e184]: "120"
                        - generic [ref=e186]: "160"
              - generic [ref=e187]:
                - heading "Top Supporters" [level=2] [ref=e188]
                - generic [ref=e189]:
                  - paragraph [ref=e190]: Top Supporters
                  - list [ref=e191]:
                    - listitem [ref=e192]:
                      - text: "1"
                      - generic [ref=e193]:
                        - generic [ref=e194]:
                          - text: "@stellar-fan"
                          - generic [ref=e195]: 300 XLM
                        - paragraph [ref=e196]: 8 tips
                    - listitem [ref=e197]:
                      - text: "2"
                      - generic [ref=e198]:
                        - generic [ref=e199]:
                          - text: "@xlm-lover"
                          - generic [ref=e200]: 250 XLM
                        - paragraph [ref=e201]: 5 tips
                    - listitem [ref=e202]:
                      - text: "3"
                      - generic [ref=e203]:
                        - generic [ref=e204]:
                          - text: "@crypto-alice"
                          - generic [ref=e205]: 180 XLM
                        - paragraph [ref=e206]: 12 tips
                    - listitem [ref=e207]:
                      - text: "4"
                      - generic [ref=e208]:
                        - generic [ref=e209]:
                          - text: "@blockchainer"
                          - generic [ref=e210]: 120 XLM
                        - paragraph [ref=e211]: 3 tips
                    - listitem [ref=e212]:
                      - text: "5"
                      - generic [ref=e213]:
                        - generic [ref=e214]:
                          - text: "@defi-bob"
                          - generic [ref=e215]: 90 XLM
                        - paragraph [ref=e216]: 6 tips
            - generic [ref=e217]:
              - heading "Activity Heatmap" [level=2] [ref=e218]
              - generic [ref=e219]:
                - generic [ref=e220]:
                  - generic [ref=e221]:
                    - generic [ref=e222]:
                      - heading "testuser's Tip Activity" [level=3] [ref=e223]
                      - paragraph [ref=e224]: 537 tips · 219 active days
                    - generic [ref=e225]:
                      - generic [ref=e226]:
                        - button "1yr" [ref=e227]
                        - button "2yr" [ref=e228]
                        - button "3yr" [ref=e229]
                      - generic [ref=e230]:
                        - button "Previous year" [ref=e231]
                        - text: This year
                        - button "Next year" [disabled] [ref=e233]
                      - generic [ref=e235]:
                        - button "Ocean theme" [pressed] [ref=e236]
                        - button "Sunrise theme" [ref=e237]
                        - button "Moss theme" [ref=e238]
                        - button "Purple theme" [ref=e239]
                        - button "Mono theme" [ref=e240]
                  - generic [ref=e241]:
                    - grid "Tip activity heatmap" [ref=e242]:
                      - generic [ref=e243]:
                        - generic [ref=e244]:
                          - generic [ref=e245]: Aug
                          - generic [ref=e246]: Sep
                          - generic [ref=e247]: Oct
                          - generic [ref=e248]: Nov
                          - generic [ref=e249]: Dec
                          - generic [ref=e250]: Jan
                          - generic [ref=e251]: Feb
                          - generic [ref=e252]: Mar
                          - generic [ref=e253]: Apr
                          - generic [ref=e254]: May
                          - generic [ref=e255]: Jun
                          - generic [ref=e256]: Jul
                          - generic [ref=e257]: Aug
                        - generic [ref=e258]:
                          - generic [ref=e259]:
                            - generic [ref=e261]: Mon
                            - generic [ref=e263]: Wed
                            - generic [ref=e265]: Fri
                          - generic [ref=e267]:
                            - row "Week of 2025-08-17" [ref=e268]:
                              - 'gridcell "2025-08-17: no tips" [ref=e269] [cursor=pointer]'
                              - 'gridcell "2025-08-18: no tips" [ref=e270] [cursor=pointer]'
                              - 'gridcell "2025-08-19: no tips" [ref=e271] [cursor=pointer]'
                              - 'gridcell "2025-08-20: 185.81 XLM, 3 tips" [ref=e272] [cursor=pointer]'
                              - 'gridcell "2025-08-21: no tips" [ref=e273] [cursor=pointer]'
                              - 'gridcell "2025-08-22: 86.34 XLM, 1 tip" [ref=e274] [cursor=pointer]'
                              - 'gridcell "2025-08-23: 148.90 XLM, 2 tips" [ref=e275] [cursor=pointer]'
                            - row "Week of 2025-08-24" [ref=e276]:
                              - 'gridcell "2025-08-24: no tips" [ref=e277] [cursor=pointer]'
                              - 'gridcell "2025-08-25: 323.47 XLM, 4 tips" [ref=e278] [cursor=pointer]'
                              - 'gridcell "2025-08-26: no tips" [ref=e279] [cursor=pointer]'
                              - 'gridcell "2025-08-27: no tips" [ref=e280] [cursor=pointer]'
                              - 'gridcell "2025-08-28: 32.60 XLM, 1 tip" [ref=e281] [cursor=pointer]'
                              - 'gridcell "2025-08-29: 190.77 XLM, 3 tips" [ref=e282] [cursor=pointer]'
                              - 'gridcell "2025-08-30: no tips" [ref=e283] [cursor=pointer]'
                            - row "Week of 2025-08-31" [ref=e284]:
                              - 'gridcell "2025-08-31: no tips" [ref=e285] [cursor=pointer]'
                              - 'gridcell "2025-09-01: no tips" [ref=e286] [cursor=pointer]'
                              - 'gridcell "2025-09-02: no tips" [ref=e287] [cursor=pointer]'
                              - 'gridcell "2025-09-03: 161.73 XLM, 3 tips" [ref=e288] [cursor=pointer]'
                              - 'gridcell "2025-09-04: 77.93 XLM, 2 tips" [ref=e289] [cursor=pointer]'
                              - 'gridcell "2025-09-05: 169.34 XLM, 3 tips" [ref=e290] [cursor=pointer]'
                              - 'gridcell "2025-09-06: 213.69 XLM, 2 tips" [ref=e291] [cursor=pointer]'
                            - row "Week of 2025-09-07" [ref=e292]:
                              - 'gridcell "2025-09-07: no tips" [ref=e293] [cursor=pointer]'
                              - 'gridcell "2025-09-08: 134.62 XLM, 2 tips" [ref=e294] [cursor=pointer]'
                              - 'gridcell "2025-09-09: 204.92 XLM, 2 tips" [ref=e295] [cursor=pointer]'
                              - 'gridcell "2025-09-10: 354.53 XLM, 4 tips" [ref=e296] [cursor=pointer]'
                              - 'gridcell "2025-09-11: 56.36 XLM, 1 tip" [ref=e297] [cursor=pointer]'
                              - 'gridcell "2025-09-12: 208.30 XLM, 3 tips" [ref=e298] [cursor=pointer]'
                              - 'gridcell "2025-09-13: no tips" [ref=e299] [cursor=pointer]'
                            - row "Week of 2025-09-14" [ref=e300]:
                              - 'gridcell "2025-09-14: no tips" [ref=e301] [cursor=pointer]'
                              - 'gridcell "2025-09-15: 248.97 XLM, 4 tips" [ref=e302] [cursor=pointer]'
                              - 'gridcell "2025-09-16: no tips" [ref=e303] [cursor=pointer]'
                              - 'gridcell "2025-09-17: no tips" [ref=e304] [cursor=pointer]'
                              - 'gridcell "2025-09-18: 260.22 XLM, 4 tips" [ref=e305] [cursor=pointer]'
                              - 'gridcell "2025-09-19: 65.26 XLM, 1 tip" [ref=e306] [cursor=pointer]'
                              - 'gridcell "2025-09-20: no tips" [ref=e307] [cursor=pointer]'
                            - row "Week of 2025-09-21" [ref=e308]:
                              - 'gridcell "2025-09-21: 12.59 XLM, 1 tip" [ref=e309] [cursor=pointer]'
                              - 'gridcell "2025-09-22: no tips" [ref=e310] [cursor=pointer]'
                              - 'gridcell "2025-09-23: 167.61 XLM, 4 tips" [ref=e311] [cursor=pointer]'
                              - 'gridcell "2025-09-24: no tips" [ref=e312] [cursor=pointer]'
                              - 'gridcell "2025-09-25: 418.64 XLM, 4 tips" [ref=e313] [cursor=pointer]'
                              - 'gridcell "2025-09-26: no tips" [ref=e314] [cursor=pointer]'
                              - 'gridcell "2025-09-27: 171.83 XLM, 4 tips" [ref=e315] [cursor=pointer]'
                            - row "Week of 2025-09-28" [ref=e316]:
                              - 'gridcell "2025-09-28: 144.40 XLM, 2 tips" [ref=e317] [cursor=pointer]'
                              - 'gridcell "2025-09-29: 124.89 XLM, 1 tip" [ref=e318] [cursor=pointer]'
                              - 'gridcell "2025-09-30: 264.94 XLM, 4 tips" [ref=e319] [cursor=pointer]'
                              - 'gridcell "2025-10-01: 203.85 XLM, 4 tips" [ref=e320] [cursor=pointer]'
                              - 'gridcell "2025-10-02: 294.96 XLM, 4 tips" [ref=e321] [cursor=pointer]'
                              - 'gridcell "2025-10-03: 106.05 XLM, 1 tip" [ref=e322] [cursor=pointer]'
                              - 'gridcell "2025-10-04: 44.39 XLM, 1 tip" [ref=e323] [cursor=pointer]'
                            - row "Week of 2025-10-05" [ref=e324]:
                              - 'gridcell "2025-10-05: 204.07 XLM, 3 tips" [ref=e325] [cursor=pointer]'
                              - 'gridcell "2025-10-06: no tips" [ref=e326] [cursor=pointer]'
                              - 'gridcell "2025-10-07: 232.66 XLM, 3 tips" [ref=e327] [cursor=pointer]'
                              - 'gridcell "2025-10-08: 331.53 XLM, 4 tips" [ref=e328] [cursor=pointer]'
                              - 'gridcell "2025-10-09: 236.85 XLM, 4 tips" [ref=e329] [cursor=pointer]'
                              - 'gridcell "2025-10-10: 375.74 XLM, 4 tips" [ref=e330] [cursor=pointer]'
                              - 'gridcell "2025-10-11: 297.93 XLM, 4 tips" [ref=e331] [cursor=pointer]'
                            - row "Week of 2025-10-12" [ref=e332]:
                              - 'gridcell "2025-10-12: 81.78 XLM, 2 tips" [ref=e333] [cursor=pointer]'
                              - 'gridcell "2025-10-13: 129.94 XLM, 3 tips" [ref=e334] [cursor=pointer]'
                              - 'gridcell "2025-10-14: 97.08 XLM, 1 tip" [ref=e335] [cursor=pointer]'
                              - 'gridcell "2025-10-15: 124.76 XLM, 2 tips" [ref=e336] [cursor=pointer]'
                              - 'gridcell "2025-10-16: 106.34 XLM, 3 tips" [ref=e337] [cursor=pointer]'
                              - 'gridcell "2025-10-17: 285.99 XLM, 3 tips" [ref=e338] [cursor=pointer]'
                              - 'gridcell "2025-10-18: 106.15 XLM, 3 tips" [ref=e339] [cursor=pointer]'
                            - row "Week of 2025-10-19" [ref=e340]:
                              - 'gridcell "2025-10-19: 248.38 XLM, 4 tips" [ref=e341] [cursor=pointer]'
                              - 'gridcell "2025-10-20: no tips" [ref=e342] [cursor=pointer]'
                              - 'gridcell "2025-10-21: 156.75 XLM, 3 tips" [ref=e343] [cursor=pointer]'
                              - 'gridcell "2025-10-22: no tips" [ref=e344] [cursor=pointer]'
                              - 'gridcell "2025-10-23: 139.30 XLM, 2 tips" [ref=e345] [cursor=pointer]'
                              - 'gridcell "2025-10-24: 163.88 XLM, 3 tips" [ref=e346] [cursor=pointer]'
                              - 'gridcell "2025-10-25: no tips" [ref=e347] [cursor=pointer]'
                            - row "Week of 2025-10-26" [ref=e348]:
                              - 'gridcell "2025-10-26: no tips" [ref=e349] [cursor=pointer]'
                              - 'gridcell "2025-10-27: 11.89 XLM, 1 tip" [ref=e350] [cursor=pointer]'
                              - 'gridcell "2025-10-28: no tips" [ref=e351] [cursor=pointer]'
                              - 'gridcell "2025-10-29: no tips" [ref=e352] [cursor=pointer]'
                              - 'gridcell "2025-10-30: no tips" [ref=e353] [cursor=pointer]'
                              - 'gridcell "2025-10-31: 80.17 XLM, 1 tip" [ref=e354] [cursor=pointer]'
                              - 'gridcell "2025-11-01: 121.60 XLM, 1 tip" [ref=e355] [cursor=pointer]'
                            - row "Week of 2025-11-02" [ref=e356]:
                              - 'gridcell "2025-11-02: 313.35 XLM, 4 tips" [ref=e357] [cursor=pointer]'
                              - 'gridcell "2025-11-03: no tips" [ref=e358] [cursor=pointer]'
                              - 'gridcell "2025-11-04: 77.53 XLM, 1 tip" [ref=e359] [cursor=pointer]'
                              - 'gridcell "2025-11-05: no tips" [ref=e360] [cursor=pointer]'
                              - 'gridcell "2025-11-06: 16.99 XLM, 1 tip" [ref=e361] [cursor=pointer]'
                              - 'gridcell "2025-11-07: no tips" [ref=e362] [cursor=pointer]'
                              - 'gridcell "2025-11-08: 205.18 XLM, 4 tips" [ref=e363] [cursor=pointer]'
                            - row "Week of 2025-11-09" [ref=e364]:
                              - 'gridcell "2025-11-09: 48.96 XLM, 1 tip" [ref=e365] [cursor=pointer]'
                              - 'gridcell "2025-11-10: no tips" [ref=e366] [cursor=pointer]'
                              - 'gridcell "2025-11-11: no tips" [ref=e367] [cursor=pointer]'
                              - 'gridcell "2025-11-12: 75.59 XLM, 1 tip" [ref=e368] [cursor=pointer]'
                              - 'gridcell "2025-11-13: 60.57 XLM, 2 tips" [ref=e369] [cursor=pointer]'
                              - 'gridcell "2025-11-14: 78.66 XLM, 1 tip" [ref=e370] [cursor=pointer]'
                              - 'gridcell "2025-11-15: no tips" [ref=e371] [cursor=pointer]'
                            - row "Week of 2025-11-16" [ref=e372]:
                              - 'gridcell "2025-11-16: no tips" [ref=e373] [cursor=pointer]'
                              - 'gridcell "2025-11-17: 149.67 XLM, 3 tips" [ref=e374] [cursor=pointer]'
                              - 'gridcell "2025-11-18: 16.53 XLM, 1 tip" [ref=e375] [cursor=pointer]'
                              - 'gridcell "2025-11-19: 24.49 XLM, 2 tips" [ref=e376] [cursor=pointer]'
                              - 'gridcell "2025-11-20: 124.74 XLM, 1 tip" [ref=e377] [cursor=pointer]'
                              - 'gridcell "2025-11-21: no tips" [ref=e378] [cursor=pointer]'
                              - 'gridcell "2025-11-22: 93.89 XLM, 1 tip" [ref=e379] [cursor=pointer]'
                            - row "Week of 2025-11-23" [ref=e380]:
                              - 'gridcell "2025-11-23: 24.66 XLM, 1 tip" [ref=e381] [cursor=pointer]'
                              - 'gridcell "2025-11-24: no tips" [ref=e382] [cursor=pointer]'
                              - 'gridcell "2025-11-25: no tips" [ref=e383] [cursor=pointer]'
                              - 'gridcell "2025-11-26: 310.82 XLM, 4 tips" [ref=e384] [cursor=pointer]'
                              - 'gridcell "2025-11-27: 113.78 XLM, 2 tips" [ref=e385] [cursor=pointer]'
                              - 'gridcell "2025-11-28: no tips" [ref=e386] [cursor=pointer]'
                              - 'gridcell "2025-11-29: no tips" [ref=e387] [cursor=pointer]'
                            - row "Week of 2025-11-30" [ref=e388]:
                              - 'gridcell "2025-11-30: no tips" [ref=e389] [cursor=pointer]'
                              - 'gridcell "2025-12-01: no tips" [ref=e390] [cursor=pointer]'
                              - 'gridcell "2025-12-02: no tips" [ref=e391] [cursor=pointer]'
                              - 'gridcell "2025-12-03: 135.06 XLM, 3 tips" [ref=e392] [cursor=pointer]'
                              - 'gridcell "2025-12-04: no tips" [ref=e393] [cursor=pointer]'
                              - 'gridcell "2025-12-05: no tips" [ref=e394] [cursor=pointer]'
                              - 'gridcell "2025-12-06: 195.59 XLM, 3 tips" [ref=e395] [cursor=pointer]'
                            - row "Week of 2025-12-07" [ref=e396]:
                              - 'gridcell "2025-12-07: 103.73 XLM, 2 tips" [ref=e397] [cursor=pointer]'
                              - 'gridcell "2025-12-08: 55.30 XLM, 1 tip" [ref=e398] [cursor=pointer]'
                              - 'gridcell "2025-12-09: no tips" [ref=e399] [cursor=pointer]'
                              - 'gridcell "2025-12-10: 355.85 XLM, 4 tips" [ref=e400] [cursor=pointer]'
                              - 'gridcell "2025-12-11: no tips" [ref=e401] [cursor=pointer]'
                              - 'gridcell "2025-12-12: 112.36 XLM, 3 tips" [ref=e402] [cursor=pointer]'
                              - 'gridcell "2025-12-13: 154.08 XLM, 2 tips" [ref=e403] [cursor=pointer]'
                            - row "Week of 2025-12-14" [ref=e404]:
                              - 'gridcell "2025-12-14: 55.02 XLM, 1 tip" [ref=e405] [cursor=pointer]'
                              - 'gridcell "2025-12-15: no tips" [ref=e406] [cursor=pointer]'
                              - 'gridcell "2025-12-16: no tips" [ref=e407] [cursor=pointer]'
                              - 'gridcell "2025-12-17: 105.06 XLM, 2 tips" [ref=e408] [cursor=pointer]'
                              - 'gridcell "2025-12-18: 165.51 XLM, 3 tips" [ref=e409] [cursor=pointer]'
                              - 'gridcell "2025-12-19: 215.74 XLM, 2 tips" [ref=e410] [cursor=pointer]'
                              - 'gridcell "2025-12-20: 335.39 XLM, 4 tips" [ref=e411] [cursor=pointer]'
                            - row "Week of 2025-12-21" [ref=e412]:
                              - 'gridcell "2025-12-21: 75.46 XLM, 1 tip" [ref=e413] [cursor=pointer]'
                              - 'gridcell "2025-12-22: 103.46 XLM, 1 tip" [ref=e414] [cursor=pointer]'
                              - 'gridcell "2025-12-23: 208.26 XLM, 3 tips" [ref=e415] [cursor=pointer]'
                              - 'gridcell "2025-12-24: 125.77 XLM, 3 tips" [ref=e416] [cursor=pointer]'
                              - 'gridcell "2025-12-25: no tips" [ref=e417] [cursor=pointer]'
                              - 'gridcell "2025-12-26: 14.24 XLM, 1 tip" [ref=e418] [cursor=pointer]'
                              - 'gridcell "2025-12-27: 170.84 XLM, 2 tips" [ref=e419] [cursor=pointer]'
                            - row "Week of 2025-12-28" [ref=e420]:
                              - 'gridcell "2025-12-28: 41.12 XLM, 1 tip" [ref=e421] [cursor=pointer]'
                              - 'gridcell "2025-12-29: 450.54 XLM, 4 tips" [ref=e422] [cursor=pointer]'
                              - 'gridcell "2025-12-30: 305.42 XLM, 4 tips" [ref=e423] [cursor=pointer]'
                              - 'gridcell "2025-12-31: no tips" [ref=e424] [cursor=pointer]'
                              - 'gridcell "2026-01-01: no tips" [ref=e425] [cursor=pointer]'
                              - 'gridcell "2026-01-02: no tips" [ref=e426] [cursor=pointer]'
                              - 'gridcell "2026-01-03: 23.65 XLM, 1 tip" [ref=e427] [cursor=pointer]'
                            - row "Week of 2026-01-04" [ref=e428]:
                              - 'gridcell "2026-01-04: no tips" [ref=e429] [cursor=pointer]'
                              - 'gridcell "2026-01-05: no tips" [ref=e430] [cursor=pointer]'
                              - 'gridcell "2026-01-06: 19.70 XLM, 1 tip" [ref=e431] [cursor=pointer]'
                              - 'gridcell "2026-01-07: 120.79 XLM, 2 tips" [ref=e432] [cursor=pointer]'
                              - 'gridcell "2026-01-08: no tips" [ref=e433] [cursor=pointer]'
                              - 'gridcell "2026-01-09: no tips" [ref=e434] [cursor=pointer]'
                              - 'gridcell "2026-01-10: 143.65 XLM, 2 tips" [ref=e435] [cursor=pointer]'
                            - row "Week of 2026-01-11" [ref=e436]:
                              - 'gridcell "2026-01-11: 286.16 XLM, 4 tips" [ref=e437] [cursor=pointer]'
                              - 'gridcell "2026-01-12: no tips" [ref=e438] [cursor=pointer]'
                              - 'gridcell "2026-01-13: 31.85 XLM, 1 tip" [ref=e439] [cursor=pointer]'
                              - 'gridcell "2026-01-14: no tips" [ref=e440] [cursor=pointer]'
                              - 'gridcell "2026-01-15: 167.03 XLM, 4 tips" [ref=e441] [cursor=pointer]'
                              - 'gridcell "2026-01-16: no tips" [ref=e442] [cursor=pointer]'
                              - 'gridcell "2026-01-17: 179.89 XLM, 2 tips" [ref=e443] [cursor=pointer]'
                            - row "Week of 2026-01-18" [ref=e444]:
                              - 'gridcell "2026-01-18: no tips" [ref=e445] [cursor=pointer]'
                              - 'gridcell "2026-01-19: 280.92 XLM, 3 tips" [ref=e446] [cursor=pointer]'
                              - 'gridcell "2026-01-20: 95.83 XLM, 1 tip" [ref=e447] [cursor=pointer]'
                              - 'gridcell "2026-01-21: no tips" [ref=e448] [cursor=pointer]'
                              - 'gridcell "2026-01-22: no tips" [ref=e449] [cursor=pointer]'
                              - 'gridcell "2026-01-23: no tips" [ref=e450] [cursor=pointer]'
                              - 'gridcell "2026-01-24: 204.47 XLM, 4 tips" [ref=e451] [cursor=pointer]'
                            - row "Week of 2026-01-25" [ref=e452]:
                              - 'gridcell "2026-01-25: 150.09 XLM, 3 tips" [ref=e453] [cursor=pointer]'
                              - 'gridcell "2026-01-26: no tips" [ref=e454] [cursor=pointer]'
                              - 'gridcell "2026-01-27: no tips" [ref=e455] [cursor=pointer]'
                              - 'gridcell "2026-01-28: no tips" [ref=e456] [cursor=pointer]'
                              - 'gridcell "2026-01-29: 276.98 XLM, 4 tips" [ref=e457] [cursor=pointer]'
                              - 'gridcell "2026-01-30: 243.22 XLM, 3 tips" [ref=e458] [cursor=pointer]'
                              - 'gridcell "2026-01-31: 73.17 XLM, 1 tip" [ref=e459] [cursor=pointer]'
                            - row "Week of 2026-02-01" [ref=e460]:
                              - 'gridcell "2026-02-01: 162.94 XLM, 2 tips" [ref=e461] [cursor=pointer]'
                              - 'gridcell "2026-02-02: 87.76 XLM, 1 tip" [ref=e462] [cursor=pointer]'
                              - 'gridcell "2026-02-03: no tips" [ref=e463] [cursor=pointer]'
                              - 'gridcell "2026-02-04: 197.60 XLM, 3 tips" [ref=e464] [cursor=pointer]'
                              - 'gridcell "2026-02-05: 196.01 XLM, 2 tips" [ref=e465] [cursor=pointer]'
                              - 'gridcell "2026-02-06: 239.78 XLM, 3 tips" [ref=e466] [cursor=pointer]'
                              - 'gridcell "2026-02-07: no tips" [ref=e467] [cursor=pointer]'
                            - row "Week of 2026-02-08" [ref=e468]:
                              - 'gridcell "2026-02-08: no tips" [ref=e469] [cursor=pointer]'
                              - 'gridcell "2026-02-09: no tips" [ref=e470] [cursor=pointer]'
                              - 'gridcell "2026-02-10: 165.72 XLM, 3 tips" [ref=e471] [cursor=pointer]'
                              - 'gridcell "2026-02-11: no tips" [ref=e472] [cursor=pointer]'
                              - 'gridcell "2026-02-12: 211.32 XLM, 2 tips" [ref=e473] [cursor=pointer]'
                              - 'gridcell "2026-02-13: no tips" [ref=e474] [cursor=pointer]'
                              - 'gridcell "2026-02-14: no tips" [ref=e475] [cursor=pointer]'
                            - row "Week of 2026-02-15" [ref=e476]:
                              - 'gridcell "2026-02-15: 323.60 XLM, 4 tips" [ref=e477] [cursor=pointer]'
                              - 'gridcell "2026-02-16: 123.25 XLM, 1 tip" [ref=e478] [cursor=pointer]'
                              - 'gridcell "2026-02-17: 200.45 XLM, 3 tips" [ref=e479] [cursor=pointer]'
                              - 'gridcell "2026-02-18: no tips" [ref=e480] [cursor=pointer]'
                              - 'gridcell "2026-02-19: 54.94 XLM, 1 tip" [ref=e481] [cursor=pointer]'
                              - 'gridcell "2026-02-20: no tips" [ref=e482] [cursor=pointer]'
                              - 'gridcell "2026-02-21: 80.99 XLM, 3 tips" [ref=e483] [cursor=pointer]'
                            - row "Week of 2026-02-22" [ref=e484]:
                              - 'gridcell "2026-02-22: no tips" [ref=e485] [cursor=pointer]'
                              - 'gridcell "2026-02-23: no tips" [ref=e486] [cursor=pointer]'
                              - 'gridcell "2026-02-24: no tips" [ref=e487] [cursor=pointer]'
                              - 'gridcell "2026-02-25: 267.69 XLM, 4 tips" [ref=e488] [cursor=pointer]'
                              - 'gridcell "2026-02-26: 42.14 XLM, 1 tip" [ref=e489] [cursor=pointer]'
                              - 'gridcell "2026-02-27: 55.46 XLM, 1 tip" [ref=e490] [cursor=pointer]'
                              - 'gridcell "2026-02-28: 226.24 XLM, 4 tips" [ref=e491] [cursor=pointer]'
                            - row "Week of 2026-03-01" [ref=e492]:
                              - 'gridcell "2026-03-01: 134.85 XLM, 2 tips" [ref=e493] [cursor=pointer]'
                              - 'gridcell "2026-03-02: no tips" [ref=e494] [cursor=pointer]'
                              - 'gridcell "2026-03-03: 84.13 XLM, 2 tips" [ref=e495] [cursor=pointer]'
                              - 'gridcell "2026-03-04: 89.02 XLM, 2 tips" [ref=e496] [cursor=pointer]'
                              - 'gridcell "2026-03-05: no tips" [ref=e497] [cursor=pointer]'
                              - 'gridcell "2026-03-06: 211.21 XLM, 2 tips" [ref=e498] [cursor=pointer]'
                              - 'gridcell "2026-03-07: 222.09 XLM, 3 tips" [ref=e499] [cursor=pointer]'
                            - row "Week of 2026-03-08" [ref=e500]:
                              - 'gridcell "2026-03-08: 8.21 XLM, 1 tip" [ref=e501] [cursor=pointer]'
                              - 'gridcell "2026-03-09: 165.41 XLM, 2 tips" [ref=e502] [cursor=pointer]'
                              - 'gridcell "2026-03-10: 39.76 XLM, 1 tip" [ref=e503] [cursor=pointer]'
                              - 'gridcell "2026-03-11: no tips" [ref=e504] [cursor=pointer]'
                              - 'gridcell "2026-03-12: no tips" [ref=e505] [cursor=pointer]'
                              - 'gridcell "2026-03-13: 275.58 XLM, 4 tips" [ref=e506] [cursor=pointer]'
                              - 'gridcell "2026-03-14: 29.09 XLM, 1 tip" [ref=e507] [cursor=pointer]'
                            - row "Week of 2026-03-15" [ref=e508]:
                              - 'gridcell "2026-03-15: 219.34 XLM, 4 tips" [ref=e509] [cursor=pointer]'
                              - 'gridcell "2026-03-16: 229.49 XLM, 4 tips" [ref=e510] [cursor=pointer]'
                              - 'gridcell "2026-03-17: no tips" [ref=e511] [cursor=pointer]'
                              - 'gridcell "2026-03-18: 250.67 XLM, 4 tips" [ref=e512] [cursor=pointer]'
                              - 'gridcell "2026-03-19: no tips" [ref=e513] [cursor=pointer]'
                              - 'gridcell "2026-03-20: 87.68 XLM, 2 tips" [ref=e514] [cursor=pointer]'
                              - 'gridcell "2026-03-21: 34.74 XLM, 1 tip" [ref=e515] [cursor=pointer]'
                            - row "Week of 2026-03-22" [ref=e516]:
                              - 'gridcell "2026-03-22: 25.77 XLM, 1 tip" [ref=e517] [cursor=pointer]'
                              - 'gridcell "2026-03-23: no tips" [ref=e518] [cursor=pointer]'
                              - 'gridcell "2026-03-24: 127.37 XLM, 2 tips" [ref=e519] [cursor=pointer]'
                              - 'gridcell "2026-03-25: 168.88 XLM, 4 tips" [ref=e520] [cursor=pointer]'
                              - 'gridcell "2026-03-26: 223.30 XLM, 4 tips" [ref=e521] [cursor=pointer]'
                              - 'gridcell "2026-03-27: 184.76 XLM, 3 tips" [ref=e522] [cursor=pointer]'
                              - 'gridcell "2026-03-28: no tips" [ref=e523] [cursor=pointer]'
                            - row "Week of 2026-03-29" [ref=e524]:
                              - 'gridcell "2026-03-29: no tips" [ref=e525] [cursor=pointer]'
                              - 'gridcell "2026-03-30: no tips" [ref=e526] [cursor=pointer]'
                              - 'gridcell "2026-03-31: 155.72 XLM, 3 tips" [ref=e527] [cursor=pointer]'
                              - 'gridcell "2026-04-01: no tips" [ref=e528] [cursor=pointer]'
                              - 'gridcell "2026-04-02: no tips" [ref=e529] [cursor=pointer]'
                              - 'gridcell "2026-04-03: 193.51 XLM, 3 tips" [ref=e530] [cursor=pointer]'
                              - 'gridcell "2026-04-04: 335.95 XLM, 4 tips" [ref=e531] [cursor=pointer]'
                            - row "Week of 2026-04-05" [ref=e532]:
                              - 'gridcell "2026-04-05: 35.29 XLM, 1 tip" [ref=e533] [cursor=pointer]'
                              - 'gridcell "2026-04-06: 134.44 XLM, 3 tips" [ref=e534] [cursor=pointer]'
                              - 'gridcell "2026-04-07: 172.89 XLM, 2 tips" [ref=e535] [cursor=pointer]'
                              - 'gridcell "2026-04-08: 97.30 XLM, 2 tips" [ref=e536] [cursor=pointer]'
                              - 'gridcell "2026-04-09: 123.96 XLM, 1 tip" [ref=e537] [cursor=pointer]'
                              - 'gridcell "2026-04-10: no tips" [ref=e538] [cursor=pointer]'
                              - 'gridcell "2026-04-11: 85.53 XLM, 2 tips" [ref=e539] [cursor=pointer]'
                            - row "Week of 2026-04-12" [ref=e540]:
                              - 'gridcell "2026-04-12: 196.36 XLM, 2 tips" [ref=e541] [cursor=pointer]'
                              - 'gridcell "2026-04-13: no tips" [ref=e542] [cursor=pointer]'
                              - 'gridcell "2026-04-14: 306.44 XLM, 4 tips" [ref=e543] [cursor=pointer]'
                              - 'gridcell "2026-04-15: 368.11 XLM, 4 tips" [ref=e544] [cursor=pointer]'
                              - 'gridcell "2026-04-16: 314.58 XLM, 4 tips" [ref=e545] [cursor=pointer]'
                              - 'gridcell "2026-04-17: 61.42 XLM, 1 tip" [ref=e546] [cursor=pointer]'
                              - 'gridcell "2026-04-18: 133.29 XLM, 2 tips" [ref=e547] [cursor=pointer]'
                            - row "Week of 2026-04-19" [ref=e548]:
                              - 'gridcell "2026-04-19: no tips" [ref=e549] [cursor=pointer]'
                              - 'gridcell "2026-04-20: 181.14 XLM, 3 tips" [ref=e550] [cursor=pointer]'
                              - 'gridcell "2026-04-21: 66.83 XLM, 1 tip" [ref=e551] [cursor=pointer]'
                              - 'gridcell "2026-04-22: 169.40 XLM, 3 tips" [ref=e552] [cursor=pointer]'
                              - 'gridcell "2026-04-23: 254.24 XLM, 3 tips" [ref=e553] [cursor=pointer]'
                              - 'gridcell "2026-04-24: 207.31 XLM, 4 tips" [ref=e554] [cursor=pointer]'
                              - 'gridcell "2026-04-25: no tips" [ref=e555] [cursor=pointer]'
                            - row "Week of 2026-04-26" [ref=e556]:
                              - 'gridcell "2026-04-26: 38.68 XLM, 1 tip" [ref=e557] [cursor=pointer]'
                              - 'gridcell "2026-04-27: 102.13 XLM, 1 tip" [ref=e558] [cursor=pointer]'
                              - 'gridcell "2026-04-28: 262.71 XLM, 4 tips" [ref=e559] [cursor=pointer]'
                              - 'gridcell "2026-04-29: 159.16 XLM, 3 tips" [ref=e560] [cursor=pointer]'
                              - 'gridcell "2026-04-30: 107.70 XLM, 2 tips" [ref=e561] [cursor=pointer]'
                              - 'gridcell "2026-05-01: 42.38 XLM, 1 tip" [ref=e562] [cursor=pointer]'
                              - 'gridcell "2026-05-02: no tips" [ref=e563] [cursor=pointer]'
                            - row "Week of 2026-05-03" [ref=e564]:
                              - 'gridcell "2026-05-03: no tips" [ref=e565] [cursor=pointer]'
                              - 'gridcell "2026-05-04: no tips" [ref=e566] [cursor=pointer]'
                              - 'gridcell "2026-05-05: no tips" [ref=e567] [cursor=pointer]'
                              - 'gridcell "2026-05-06: 178.19 XLM, 4 tips" [ref=e568] [cursor=pointer]'
                              - 'gridcell "2026-05-07: 123.29 XLM, 1 tip" [ref=e569] [cursor=pointer]'
                              - 'gridcell "2026-05-08: 179.35 XLM, 4 tips" [ref=e570] [cursor=pointer]'
                              - 'gridcell "2026-05-09: 52.79 XLM, 2 tips" [ref=e571] [cursor=pointer]'
                            - row "Week of 2026-05-10" [ref=e572]:
                              - 'gridcell "2026-05-10: 25.62 XLM, 1 tip" [ref=e573] [cursor=pointer]'
                              - 'gridcell "2026-05-11: no tips" [ref=e574] [cursor=pointer]'
                              - 'gridcell "2026-05-12: no tips" [ref=e575] [cursor=pointer]'
                              - 'gridcell "2026-05-13: 35.17 XLM, 1 tip" [ref=e576] [cursor=pointer]'
                              - 'gridcell "2026-05-14: 156.56 XLM, 3 tips" [ref=e577] [cursor=pointer]'
                              - 'gridcell "2026-05-15: no tips" [ref=e578] [cursor=pointer]'
                              - 'gridcell "2026-05-16: no tips" [ref=e579] [cursor=pointer]'
                            - row "Week of 2026-05-17" [ref=e580]:
                              - 'gridcell "2026-05-17: no tips" [ref=e581] [cursor=pointer]'
                              - 'gridcell "2026-05-18: 120.67 XLM, 1 tip" [ref=e582] [cursor=pointer]'
                              - 'gridcell "2026-05-19: 51.09 XLM, 1 tip" [ref=e583] [cursor=pointer]'
                              - 'gridcell "2026-05-20: 136.25 XLM, 2 tips" [ref=e584] [cursor=pointer]'
                              - 'gridcell "2026-05-21: no tips" [ref=e585] [cursor=pointer]'
                              - 'gridcell "2026-05-22: no tips" [ref=e586] [cursor=pointer]'
                              - 'gridcell "2026-05-23: 69.94 XLM, 1 tip" [ref=e587] [cursor=pointer]'
                            - row "Week of 2026-05-24" [ref=e588]:
                              - 'gridcell "2026-05-24: no tips" [ref=e589] [cursor=pointer]'
                              - 'gridcell "2026-05-25: 95.56 XLM, 2 tips" [ref=e590] [cursor=pointer]'
                              - 'gridcell "2026-05-26: 171.94 XLM, 2 tips" [ref=e591] [cursor=pointer]'
                              - 'gridcell "2026-05-27: no tips" [ref=e592] [cursor=pointer]'
                              - 'gridcell "2026-05-28: no tips" [ref=e593] [cursor=pointer]'
                              - 'gridcell "2026-05-29: 201.46 XLM, 4 tips" [ref=e594] [cursor=pointer]'
                              - 'gridcell "2026-05-30: 192.26 XLM, 3 tips" [ref=e595] [cursor=pointer]'
                            - row "Week of 2026-05-31" [ref=e596]:
                              - 'gridcell "2026-05-31: 120.83 XLM, 2 tips" [ref=e597] [cursor=pointer]'
                              - 'gridcell "2026-06-01: no tips" [ref=e598] [cursor=pointer]'
                              - 'gridcell "2026-06-02: no tips" [ref=e599] [cursor=pointer]'
                              - 'gridcell "2026-06-03: 63.35 XLM, 1 tip" [ref=e600] [cursor=pointer]'
                              - 'gridcell "2026-06-04: 308.34 XLM, 4 tips" [ref=e601] [cursor=pointer]'
                              - 'gridcell "2026-06-05: no tips" [ref=e602] [cursor=pointer]'
                              - 'gridcell "2026-06-06: 152.40 XLM, 3 tips" [ref=e603] [cursor=pointer]'
                            - row "Week of 2026-06-07" [ref=e604]:
                              - 'gridcell "2026-06-07: no tips" [ref=e605] [cursor=pointer]'
                              - 'gridcell "2026-06-08: no tips" [ref=e606] [cursor=pointer]'
                              - 'gridcell "2026-06-09: no tips" [ref=e607] [cursor=pointer]'
                              - 'gridcell "2026-06-10: no tips" [ref=e608] [cursor=pointer]'
                              - 'gridcell "2026-06-11: 61.43 XLM, 2 tips" [ref=e609] [cursor=pointer]'
                              - 'gridcell "2026-06-12: no tips" [ref=e610] [cursor=pointer]'
                              - 'gridcell "2026-06-13: 314.23 XLM, 4 tips" [ref=e611] [cursor=pointer]'
                            - row "Week of 2026-06-14" [ref=e612]:
                              - 'gridcell "2026-06-14: no tips" [ref=e613] [cursor=pointer]'
                              - 'gridcell "2026-06-15: no tips" [ref=e614] [cursor=pointer]'
                              - 'gridcell "2026-06-16: 117.58 XLM, 3 tips" [ref=e615] [cursor=pointer]'
                              - 'gridcell "2026-06-17: 73.96 XLM, 1 tip" [ref=e616] [cursor=pointer]'
                              - 'gridcell "2026-06-18: 209.04 XLM, 3 tips" [ref=e617] [cursor=pointer]'
                              - 'gridcell "2026-06-19: 201.18 XLM, 3 tips" [ref=e618] [cursor=pointer]'
                              - 'gridcell "2026-06-20: 157.57 XLM, 4 tips" [ref=e619] [cursor=pointer]'
                            - row "Week of 2026-06-21" [ref=e620]:
                              - 'gridcell "2026-06-21: no tips" [ref=e621] [cursor=pointer]'
                              - 'gridcell "2026-06-22: 134.72 XLM, 2 tips" [ref=e622] [cursor=pointer]'
                              - 'gridcell "2026-06-23: 14.25 XLM, 1 tip" [ref=e623] [cursor=pointer]'
                              - 'gridcell "2026-06-24: no tips" [ref=e624] [cursor=pointer]'
                              - 'gridcell "2026-06-25: 318.83 XLM, 4 tips" [ref=e625] [cursor=pointer]'
                              - 'gridcell "2026-06-26: 224.13 XLM, 3 tips" [ref=e626] [cursor=pointer]'
                              - 'gridcell "2026-06-27: no tips" [ref=e627] [cursor=pointer]'
                            - row "Week of 2026-06-28" [ref=e628]:
                              - 'gridcell "2026-06-28: 11.61 XLM, 1 tip" [ref=e629] [cursor=pointer]'
                              - 'gridcell "2026-06-29: 111.58 XLM, 1 tip" [ref=e630] [cursor=pointer]'
                              - 'gridcell "2026-06-30: 139.64 XLM, 2 tips" [ref=e631] [cursor=pointer]'
                              - 'gridcell "2026-07-01: no tips" [ref=e632] [cursor=pointer]'
                              - 'gridcell "2026-07-02: no tips" [ref=e633] [cursor=pointer]'
                              - 'gridcell "2026-07-03: no tips" [ref=e634] [cursor=pointer]'
                              - 'gridcell "2026-07-04: no tips" [ref=e635] [cursor=pointer]'
                            - row "Week of 2026-07-05" [ref=e636]:
                              - 'gridcell "2026-07-05: 144.38 XLM, 2 tips" [ref=e637] [cursor=pointer]'
                              - 'gridcell "2026-07-06: no tips" [ref=e638] [cursor=pointer]'
                              - 'gridcell "2026-07-07: 77.92 XLM, 3 tips" [ref=e639] [cursor=pointer]'
                              - 'gridcell "2026-07-08: no tips" [ref=e640] [cursor=pointer]'
                              - 'gridcell "2026-07-09: 166.92 XLM, 3 tips" [ref=e641] [cursor=pointer]'
                              - 'gridcell "2026-07-10: no tips" [ref=e642] [cursor=pointer]'
                              - 'gridcell "2026-07-11: 244.45 XLM, 4 tips" [ref=e643] [cursor=pointer]'
                            - row "Week of 2026-07-12" [ref=e644]:
                              - 'gridcell "2026-07-12: 268.43 XLM, 4 tips" [ref=e645] [cursor=pointer]'
                              - 'gridcell "2026-07-13: no tips" [ref=e646] [cursor=pointer]'
                              - 'gridcell "2026-07-14: 260.12 XLM, 4 tips" [ref=e647] [cursor=pointer]'
                              - 'gridcell "2026-07-15: no tips" [ref=e648] [cursor=pointer]'
                              - 'gridcell "2026-07-16: 250.42 XLM, 4 tips" [ref=e649] [cursor=pointer]'
                              - 'gridcell "2026-07-17: 67.18 XLM, 1 tip" [ref=e650] [cursor=pointer]'
                              - 'gridcell "2026-07-18: no tips" [ref=e651] [cursor=pointer]'
                            - row "Week of 2026-07-19" [ref=e652]:
                              - 'gridcell "2026-07-19: no tips" [ref=e653] [cursor=pointer]'
                              - 'gridcell "2026-07-20: no tips" [ref=e654] [cursor=pointer]'
                              - 'gridcell "2026-07-21: 126.99 XLM, 2 tips" [ref=e655] [cursor=pointer]'
                              - 'gridcell "2026-07-22: 215.64 XLM, 4 tips" [ref=e656] [cursor=pointer]'
                              - 'gridcell "2026-07-23: 169.17 XLM, 3 tips" [ref=e657] [cursor=pointer]'
                              - 'gridcell "2026-07-24: 142.96 XLM, 4 tips" [ref=e658] [cursor=pointer]'
                              - 'gridcell "2026-07-25: 117.59 XLM, 3 tips" [ref=e659] [cursor=pointer]'
                            - row "Week of 2026-07-26" [ref=e660]:
                              - 'gridcell "2026-07-26: 209.01 XLM, 2 tips" [ref=e661] [cursor=pointer]'
                              - 'gridcell "2026-07-27: no tips" [ref=e662] [cursor=pointer]'
                              - 'gridcell "2026-07-28: 230.80 XLM, 4 tips" [ref=e663] [cursor=pointer]'
                              - 'gridcell "2026-07-29: 10.72 XLM, 1 tip" [ref=e664] [cursor=pointer]'
                              - 'gridcell "2026-07-30: no tips" [ref=e665] [cursor=pointer]'
                              - 'gridcell "2026-07-31: no tips" [ref=e666] [cursor=pointer]'
                              - 'gridcell "2026-08-01: no tips" [ref=e667] [cursor=pointer]'
                            - row "Week of 2026-08-02" [ref=e668]:
                              - 'gridcell "2026-08-02: no tips" [ref=e669] [cursor=pointer]'
                              - 'gridcell "2026-08-03: no tips" [ref=e670] [cursor=pointer]'
                              - 'gridcell "2026-08-04: no tips" [ref=e671] [cursor=pointer]'
                              - 'gridcell "2026-08-05: 318.40 XLM, 4 tips" [ref=e672] [cursor=pointer]'
                              - 'gridcell "2026-08-06: no tips" [ref=e673] [cursor=pointer]'
                              - 'gridcell "2026-08-07: no tips" [ref=e674] [cursor=pointer]'
                              - 'gridcell "2026-08-08: 27.64 XLM, 1 tip" [ref=e675] [cursor=pointer]'
                            - row "Week of 2026-08-09" [ref=e676]:
                              - 'gridcell "2026-08-09: 104.43 XLM, 1 tip" [ref=e677] [cursor=pointer]'
                              - 'gridcell "2026-08-10: 175.82 XLM, 3 tips" [ref=e678] [cursor=pointer]'
                              - 'gridcell "2026-08-11: no tips" [ref=e679] [cursor=pointer]'
                              - 'gridcell "2026-08-12: no tips" [ref=e680] [cursor=pointer]'
                              - 'gridcell "2026-08-13: no tips" [ref=e681] [cursor=pointer]'
                              - 'gridcell "2026-08-14: 70.08 XLM, 2 tips" [ref=e682] [cursor=pointer]'
                              - 'gridcell "2026-08-15: no tips" [ref=e683] [cursor=pointer]'
                            - row "Week of 2026-08-16" [ref=e684]:
                              - 'gridcell "2026-08-16: 290.84 XLM, 4 tips" [ref=e685] [cursor=pointer]'
                              - 'gridcell "2026-08-17: no tips" [ref=e686] [cursor=pointer]'
                              - 'gridcell "2026-08-18: 83.76 XLM, 2 tips" [ref=e687] [cursor=pointer]'
                              - 'gridcell "2026-08-19: future" [ref=e688]'
                              - 'gridcell "2026-08-20: future" [ref=e689]'
                              - 'gridcell "2026-08-21: future" [ref=e690]'
                              - 'gridcell "2026-08-22: future" [ref=e691]'
                    - generic [ref=e692]:
                      - generic "Activity level legend" [ref=e693]:
                        - text: Less
                        - 'generic "Level 0: None" [ref=e694]'
                        - 'generic "Level 1: Low" [ref=e695]'
                        - 'generic "Level 2: Medium" [ref=e696]'
                        - 'generic "Level 3: High" [ref=e697]'
                        - 'generic "Level 4: Peak" [ref=e698]'
                        - text: More
                      - paragraph [ref=e699]: Today is highlighted with a border
                - generic [ref=e700]:
                  - generic [ref=e701]:
                    - img [ref=e703]
                    - generic [ref=e705]:
                      - paragraph [ref=e706]: Total Earned
                      - paragraph [ref=e707]: 34,179.5 XLM
                  - generic [ref=e708]:
                    - img [ref=e710]
                    - generic [ref=e712]:
                      - paragraph [ref=e713]: Total Tips
                      - paragraph [ref=e714]: "537"
                      - paragraph [ref=e715]: 219 active days
                  - generic [ref=e716]:
                    - img [ref=e718]
                    - generic [ref=e720]:
                      - paragraph [ref=e721]: Avg / Active Day
                      - paragraph [ref=e722]: 156.1 XLM
                  - generic [ref=e723]:
                    - img [ref=e725]
                    - generic [ref=e728]:
                      - paragraph [ref=e729]: Current Streak
                      - paragraph [ref=e730]: 1 day
                  - generic [ref=e731]:
                    - img [ref=e733]
                    - generic [ref=e735]:
                      - paragraph [ref=e736]: Longest Streak
                      - paragraph [ref=e737]: 13 days
                  - generic [ref=e738]:
                    - img [ref=e740]
                    - generic [ref=e742]:
                      - paragraph [ref=e743]: Best Day
                      - paragraph [ref=e744]: 450.5 XLM
                      - paragraph [ref=e745]: Dec 29
        - paragraph [ref=e747]: No portfolio items yet.
        - region "Tip milestones" [ref=e748]:
          - heading "Milestones" [level=2] [ref=e749]
          - paragraph [ref=e750]: No milestones yet — the first tip unlocks one! 🌱
          - generic [ref=e751]:
            - generic [ref=e752]:
              - generic [ref=e753]: 0 tips
              - generic [ref=e754]: "Next: 🌱 First Tip! (1)"
            - generic:
              - progressbar
        - generic [ref=e755]:
          - heading "Tip History" [level=2] [ref=e756]
          - generic [ref=e757]:
            - generic [ref=e758]:
              - generic [ref=e759]: 8 tips
              - text: Virtual scroll active
            - generic [ref=e760]:
              - table [ref=e761]:
                - rowgroup [ref=e762]:
                  - row "Date Amount Recipient Status Memo Transaction Actions" [ref=e763]:
                    - columnheader "Date" [ref=e764]:
                      - button "Date" [ref=e765]:
                        - text: Date
                        - img [ref=e766]
                    - columnheader "Amount" [ref=e768]:
                      - button "Amount" [ref=e769]:
                        - text: Amount
                        - img [ref=e770]
                    - columnheader "Recipient" [ref=e772]:
                      - button "Recipient" [ref=e773]:
                        - text: Recipient
                        - img [ref=e774]
                    - columnheader "Status" [ref=e776]:
                      - button "Status" [ref=e777]:
                        - text: Status
                        - img [ref=e778]
                    - columnheader "Memo" [ref=e780]
                    - columnheader "Transaction" [ref=e781]
                    - columnheader "Actions" [ref=e782]
              - region "Tip history rows" [ref=e783]:
                - table [ref=e784]:
                  - rowgroup [ref=e785]:
                    - row "Mar 20, 2024, 04:00 PM 50 XLM @alice Completed Great content! abc123... Receipt" [ref=e786]:
                      - cell "Mar 20, 2024, 04:00 PM" [ref=e787]
                      - cell "50 XLM" [ref=e788]
                      - cell "@alice" [ref=e789]:
                        - link "@alice" [ref=e790] [cursor=pointer]:
                          - /url: /creator/alice
                      - cell "Completed" [ref=e791]
                      - cell "Great content!" [ref=e792]
                      - cell "abc123..." [ref=e793]:
                        - link "abc123..." [ref=e794] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/abc123
                      - cell "Receipt" [ref=e795]:
                        - button "Receipt" [ref=e796]:
                          - img [ref=e797]
                          - text: Receipt
                    - row "Mar 19, 2024, 09:15 PM 25 XLM @stellar-dev Completed - def456... Receipt" [ref=e799]:
                      - cell "Mar 19, 2024, 09:15 PM" [ref=e800]
                      - cell "25 XLM" [ref=e801]
                      - cell "@stellar-dev" [ref=e802]:
                        - link "@stellar-dev" [ref=e803] [cursor=pointer]:
                          - /url: /creator/stellar-dev
                      - cell "Completed" [ref=e804]
                      - cell "-" [ref=e805]
                      - cell "def456..." [ref=e806]:
                        - link "def456..." [ref=e807] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/def456
                      - cell "Receipt" [ref=e808]:
                        - button "Receipt" [ref=e809]:
                          - img [ref=e810]
                          - text: Receipt
                    - row "Mar 18, 2024, 02:45 PM 100 XLM @pixelmaker Pending - - Receipt" [ref=e812]:
                      - cell "Mar 18, 2024, 02:45 PM" [ref=e813]
                      - cell "100 XLM" [ref=e814]
                      - cell "@pixelmaker" [ref=e815]:
                        - link "@pixelmaker" [ref=e816] [cursor=pointer]:
                          - /url: /creator/pixelmaker
                      - cell "Pending" [ref=e817]
                      - cell "-" [ref=e818]
                      - cell "-" [ref=e819]
                      - cell "Receipt" [ref=e820]:
                        - button "Receipt" [ref=e821]:
                          - img [ref=e822]
                          - text: Receipt
                    - row "Mar 17, 2024, 07:50 PM 15 XLM @crypto-artist Completed - ghi789... Receipt" [ref=e824]:
                      - cell "Mar 17, 2024, 07:50 PM" [ref=e825]
                      - cell "15 XLM" [ref=e826]
                      - cell "@crypto-artist" [ref=e827]:
                        - link "@crypto-artist" [ref=e828] [cursor=pointer]:
                          - /url: /creator/crypto-artist
                      - cell "Completed" [ref=e829]
                      - cell "-" [ref=e830]
                      - cell "ghi789..." [ref=e831]:
                        - link "ghi789..." [ref=e832] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/ghi789
                      - cell "Receipt" [ref=e833]:
                        - button "Receipt" [ref=e834]:
                          - img [ref=e835]
                          - text: Receipt
                    - row "Mar 16, 2024, 04:30 PM 75 XLM @blockchain-edu Failed - - Receipt" [ref=e837]:
                      - cell "Mar 16, 2024, 04:30 PM" [ref=e838]
                      - cell "75 XLM" [ref=e839]
                      - cell "@blockchain-edu" [ref=e840]:
                        - link "@blockchain-edu" [ref=e841] [cursor=pointer]:
                          - /url: /creator/blockchain-edu
                      - cell "Failed" [ref=e842]
                      - cell "-" [ref=e843]
                      - cell "-" [ref=e844]
                      - cell "Receipt" [ref=e845]:
                        - button "Receipt" [ref=e846]:
                          - img [ref=e847]
                          - text: Receipt
                    - row "Mar 15, 2024, 10:00 PM 30 XLM @community-lab Completed - jkl012... Receipt" [ref=e849]:
                      - cell "Mar 15, 2024, 10:00 PM" [ref=e850]
                      - cell "30 XLM" [ref=e851]
                      - cell "@community-lab" [ref=e852]:
                        - link "@community-lab" [ref=e853] [cursor=pointer]:
                          - /url: /creator/community-lab
                      - cell "Completed" [ref=e854]
                      - cell "-" [ref=e855]
                      - cell "jkl012..." [ref=e856]:
                        - link "jkl012..." [ref=e857] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/jkl012
                      - cell "Receipt" [ref=e858]:
                        - button "Receipt" [ref=e859]:
                          - img [ref=e860]
                          - text: Receipt
                    - row "Mar 14, 2024, 07:15 PM 200 XLM @nft-creator Completed Amazing work! mno345... Receipt" [ref=e862]:
                      - cell "Mar 14, 2024, 07:15 PM" [ref=e863]
                      - cell "200 XLM" [ref=e864]
                      - cell "@nft-creator" [ref=e865]:
                        - link "@nft-creator" [ref=e866] [cursor=pointer]:
                          - /url: /creator/nft-creator
                      - cell "Completed" [ref=e867]
                      - cell "Amazing work!" [ref=e868]
                      - cell "mno345..." [ref=e869]:
                        - link "mno345..." [ref=e870] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/mno345
                      - cell "Receipt" [ref=e871]:
                        - button "Receipt" [ref=e872]:
                          - img [ref=e873]
                          - text: Receipt
                    - row "Mar 13, 2024, 03:40 PM 45 XLM @defi-expert Completed - pqr678... Receipt" [ref=e875]:
                      - cell "Mar 13, 2024, 03:40 PM" [ref=e876]
                      - cell "45 XLM" [ref=e877]
                      - cell "@defi-expert" [ref=e878]:
                        - link "@defi-expert" [ref=e879] [cursor=pointer]:
                          - /url: /creator/defi-expert
                      - cell "Completed" [ref=e880]
                      - cell "-" [ref=e881]
                      - cell "pqr678..." [ref=e882]:
                        - link "pqr678..." [ref=e883] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/pqr678
                      - cell "Receipt" [ref=e884]:
                        - button "Receipt" [ref=e885]:
                          - img [ref=e886]
                          - text: Receipt
        - generic [ref=e888]:
          - heading "Comments (0)" [level=2] [ref=e889]
          - generic [ref=e890]:
            - textbox "Add a comment..." [ref=e891]
            - button "Post Comment" [disabled] [ref=e892]
        - region "Events" [ref=e893]:
          - generic [ref=e895]:
            - heading "Events" [level=2] [ref=e896]
            - paragraph [ref=e897]: 2 upcoming · 0 past
          - generic [ref=e898]:
            - button "upcoming" [pressed] [ref=e899]
            - button "past" [ref=e900]
          - list [ref=e901]:
            - listitem [ref=e902]:
              - article "Live Coding Stream" [ref=e903]:
                - generic [ref=e904]:
                  - generic [ref=e905]: 🎥
                  - generic [ref=e906]:
                    - generic [ref=e907]: STREAM
                    - heading "Live Coding Stream" [level=3] [ref=e908]
                    - paragraph [ref=e909]: Building a Stellar payment integration live.
                    - paragraph [ref=e910]: 🕐 Thu, Aug 20, 4:31 PM UTC
                    - link "🔗 https://twitch.tv/example" [ref=e911] [cursor=pointer]:
                      - /url: https://twitch.tv/example
                - generic [ref=e912]:
                  - button "Add to calendar" [ref=e914]: + Add to Calendar
                  - link "Join Event →" [ref=e915] [cursor=pointer]:
                    - /url: https://twitch.tv/example
            - listitem [ref=e916]:
              - article "Weekly AMA" [ref=e917]:
                - generic [ref=e918]:
                  - generic [ref=e919]: 💬
                  - generic [ref=e920]:
                    - generic [ref=e921]: AMARecurring
                    - heading "Weekly AMA" [level=3] [ref=e922]
                    - paragraph [ref=e923]: Ask me anything about Web3 and Stellar.
                    - paragraph [ref=e924]: 🕐 Tue, Aug 25, 4:31 PM UTC
                - button "Add to calendar" [ref=e927]: + Add to Calendar
        - region "Recommended Creators" [ref=e928]:
          - generic [ref=e930]:
            - heading "Recommended Creators" [level=2] [ref=e931]
            - paragraph [ref=e932]: Showing popular creators. Your recommendations improve as you explore.
          - list [ref=e933]:
            - listitem [ref=e934]:
              - link "View NFT Creator's profile" [ref=e935] [cursor=pointer]:
                - /url: /creator/nft-creator
                - img "Avatar for NFT Creator" [ref=e936]
                - generic [ref=e937]:
                  - paragraph [ref=e938]: art
                  - paragraph [ref=e939]: NFT Creator
                  - paragraph [ref=e940]: Trending creator
                - generic [ref=e941]:
                  - paragraph [ref=e942]: 4,200
                  - paragraph [ref=e943]: followers
            - listitem [ref=e944]:
              - link "View Protocol Dev's profile" [ref=e945] [cursor=pointer]:
                - /url: /creator/protocol-dev
                - img "Avatar for Protocol Dev" [ref=e946]
                - generic [ref=e947]:
                  - paragraph [ref=e948]: tech
                  - paragraph [ref=e949]: Protocol Dev
                  - paragraph [ref=e950]: Trending creator
                - generic [ref=e951]:
                  - paragraph [ref=e952]: 4,100
                  - paragraph [ref=e953]: followers
            - listitem [ref=e954]:
              - link "View Smart Contract Dev's profile" [ref=e955] [cursor=pointer]:
                - /url: /creator/smart-contract-dev
                - img "Avatar for Smart Contract Dev" [ref=e956]
                - generic [ref=e957]:
                  - paragraph [ref=e958]: tech
                  - paragraph [ref=e959]: Smart Contract Dev
                  - paragraph [ref=e960]: Trending creator
                - generic [ref=e961]:
                  - paragraph [ref=e962]: 3,800
                  - paragraph [ref=e963]: followers
      - generic [ref=e964]:
        - generic [ref=e965]:
          - generic [ref=e967]: "Preferred asset: XLM"
          - heading "Send a Tip" [level=2] [ref=e968]
          - paragraph [ref=e969]: Support this creator directly using Stellar assets.
          - form "Send a tip to testuser" [ref=e970]:
            - generic [ref=e971]:
              - text: Amount
              - spinbutton "Amount" [ref=e972]
              - paragraph [ref=e973]: Amount in Stellar assets
            - generic [ref=e975]:
              - text: Asset Code
              - textbox "Asset Code" [ref=e976]:
                - /placeholder: XLM
                - text: XLM
              - paragraph [ref=e977]: e.g. XLM, USDC
            - generic [ref=e979]:
              - text: Message (optional)
              - textbox "Message (optional)" [ref=e980]:
                - /placeholder: Thanks for the great content!
              - paragraph [ref=e981]: A short message for the creator (max 200 characters)
            - button "Create Tip Intent" [ref=e984]
        - generic [ref=e985]:
          - heading "Share Creator" [level=3] [ref=e986]:
            - img [ref=e987]
            - text: Share Creator
          - generic [ref=e993]:
            - generic [ref=e994]:
              - generic [ref=e995]:
                - heading "Share profile" [level=2] [ref=e996]
                - paragraph [ref=e997]: Let your audience know about this creator.
              - button "Share" [ref=e998]
            - generic [ref=e999]:
              - text: "Current share counts:"
              - generic [ref=e1000]: Twitter 0
              - generic [ref=e1001]: Facebook 0
              - generic [ref=e1002]: LinkedIn 0
              - generic [ref=e1003]: Copied 0
        - generic [ref=e1004]:
          - heading "Creator Tag Cloud" [level=3] [ref=e1005]
          - generic [ref=e1006]:
            - heading "Popular Tags" [level=3] [ref=e1007]
            - generic [ref=e1009]: "#test-tag (1)"
  - generic [ref=e1010]:
    - img [ref=e1012]
    - button "Open Tanstack query devtools" [ref=e1060] [cursor=pointer]:
      - img [ref=e1061]
  - generic [ref=e1109]:
    - img [ref=e1111]
    - button "Open Tanstack query devtools" [ref=e1159] [cursor=pointer]:
      - img [ref=e1160]
  - alert [ref=e1208]
  - generic [ref=e1209]: "0"
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
      |           ^ Error: 2 axe violation(s) on light theme > creator profile:
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