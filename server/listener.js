process.env.NODE_ENV = 'production'

;(() => {
    if (!config.discordWebhookUrl)
        return

    const request = require('request')

    on('cs-video-call:onTransmissionEstablished', (entry, restarting) => {
        if (restarting)
            return

        request.post({
            url: config.discordWebhookUrl,

            formData: {
                payload_json: JSON.stringify({
                    username: 'cs-video-call',
                    avatar_url: 'https://files.criticalscripts.shop/brand-assets/favicon.png',

                    embeds: [
                        {
                            type: 'rich',
                            title: 'Video Transmission Established',
                            color: 0xff0037,

                            fields: [
                                {
                                    name: 'Initiator',
                                    value: `_${entry.initiator.name}_ (\`${entry.initiator.license}\`)`,
                                    inline: false
                                },

                                {
                                    name: 'Target',
                                    value: `_${entry.target.name}_ (\`${entry.target.license}\`)`,
                                    inline: false
                                }
                            ],

                            footer: {
                                text: 'Critical Scripts',
                                icon_url: 'https://files.criticalscripts.shop/brand-assets/favicon.png'
                            }
                        }
                    ]
                })
            }
        }, (error, response, body) => {
            if (error)
                console.error('[cs-video-call-dw] Failed to post Discord webhook!', error)
        })
    })
}) ();
