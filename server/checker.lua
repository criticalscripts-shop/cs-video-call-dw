-- If you do not wish to be informed about version updates on this resource feel free to comment the following code or remove this file altogether from the fxmanifest.lua file of this resource.

local version = GetResourceMetadata(GetCurrentResourceName(), 'version', 0)

PerformHttpRequest('https://updates.criticalscripts.com/cs-video-call-dw', function(e, b, h)
    if (e == 200) then
        local data = json.decode(b)

        if (data) then
            if (data.version ~= version) then
                print('[criticalscripts.shop] Resource "cs-video-call-dw" is outdated, please download the latest version from our GitHub (https://github.com/criticalscripts-shop/cs-video-call-dw).')
            else
                print('[criticalscripts.shop] Resource "cs-video-call-dw" is up to date.')
            end

            if (data.message) then
                print('[criticalscripts.shop] ' .. data.message)
            end
        else
            print('[criticalscripts.shop] Resource "cs-video-call-dw" failed to perform update check.')
        end
    else
        print('[criticalscripts.shop] Resource "cs-video-call-dw" failed to perform update check.')
    end
end, 'GET', '', {})
