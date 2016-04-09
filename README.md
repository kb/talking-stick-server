# TalkingStick

The Talking Stick server is written in [Elixir](http://elixir-lang.org/) using the
[Phoenix Framework](http://www.phoenixframework.org/) with [Phoenix Channels](https://hexdocs.pm

## Getting Started

1. `mix deps.get` (Answer `Y` if prompted with `Shall I install Hex? [Yn]`)
1. `npm install`
1. `mix phoenix.gen.secret` to generate a new value for `secret_key_base` 
1. `SECRET_KEY_BASE=<value from above>` && `export SECRET_KEY_BASE`
1. Generate a new value 8 character value for `signing_salt` (Phoenix does not provide a generator)
1. `SIGNING_SALT=<value from above>` && `export SIGNING_SALT`
1. `mix phoenix.server` (Answer `Y` if prompted with `Shall I install rebar? [Yn]`)

Now you can visit [`localhost:4000?meeting_id=123456`](http://localhost:4000?meeting_id=123456) in your browser
to try out a test meeting.
